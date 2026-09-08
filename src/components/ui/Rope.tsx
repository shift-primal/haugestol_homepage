import { useEffect, useRef } from "react";
import { useAppSound } from "#/hooks/useAppSound";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { useThemeTransition } from "#/hooks/useThemeTransition";
import { setPullFilter } from "#/lib/pull-filter";

// Intensity for the brigthness filter on drag down
const BRIGHTNESS_FILTER = 0.25;

// Primary tunables — adjust these to change how the rope looks and feels.
const CONTAINER_WIDTH = 32;
const SEGMENT_LENGTH = 14; // px per simulated link — controls curve resolution

const ROPE_LENGTH_DESKTOP = 150; // target resting (unpulled) length of the cord
const ROPE_LENGTH_MOBILE = 100;
const PULL_RATIO_DESKTOP = 1.62; // how far past its resting length it can be pulled
const PULL_RATIO_MOBILE = 1.62;

const STRETCH_TRIGGER_RATIO = 0.43; // fraction of resting length that must stretch taut before a pull arms the switch
const GRAVITY = 0.7;
const DAMPING = 0.985;
const CONSTRAINT_ITERATIONS = 8;
const MIN_PULL_Y = -100;
const KNOB_WIDTH = 24;
const KNOB_HEIGHT = 32;
const HITBOX_EXTRA_SIDE_DESKTOP = 10;
const HITBOX_EXTRA_BOTTOM_DESKTOP = 10;
const HITBOX_EXTRA_SIDE_MOBILE = 24;
const HITBOX_EXTRA_BOTTOM_MOBILE = 24;

const REFERENCE_FRAME_MS = 1000 / 60;
const MAX_SUBSTEPS = 10; // caps catch-up after a stall (tab/focus change) instead of injecting one big kick
const SETTLE_EPSILON = 0.02; // px of per-step movement below which a point counts as still
const SETTLE_STEPS = 45; // consecutive still steps (~0.75s of sim time) before the loop parks itself
const ANCHOR_X = CONTAINER_WIDTH / 2;

interface Point {
	x: number;
	y: number;
	oldX: number;
	oldY: number;
	prevX: number;
	prevY: number;
	pinned: boolean;
}

interface RopeConfig {
	numPoints: number;
	restLength: number;
	maxPull: number;
	containerHeight: number;
	stretchTrigger: number;
	hitboxWidth: number;
	hitboxHeight: number;
}

function computeConfig(
	ropeLength: number,
	pullRatio: number,
	hitboxExtraSide: number,
	hitboxExtraBottom: number,
): RopeConfig {
	const numPoints = Math.round(ropeLength / SEGMENT_LENGTH) + 1;
	const restLength = SEGMENT_LENGTH * (numPoints - 1);
	const maxPull = restLength * pullRatio;
	const hitboxHeight = KNOB_HEIGHT + hitboxExtraBottom;
	return {
		numPoints,
		restLength,
		maxPull,
		containerHeight: maxPull + hitboxHeight,
		stretchTrigger: restLength * STRETCH_TRIGGER_RATIO,
		hitboxWidth: KNOB_WIDTH + hitboxExtraSide * 2,
		hitboxHeight,
	};
}

const DESKTOP_CONFIG = computeConfig(
	ROPE_LENGTH_DESKTOP,
	PULL_RATIO_DESKTOP,
	HITBOX_EXTRA_SIDE_DESKTOP,
	HITBOX_EXTRA_BOTTOM_DESKTOP,
);
const MOBILE_CONFIG = computeConfig(
	ROPE_LENGTH_MOBILE,
	PULL_RATIO_MOBILE,
	HITBOX_EXTRA_SIDE_MOBILE,
	HITBOX_EXTRA_BOTTOM_MOBILE,
);

function createPoints(numPoints: number): Point[] {
	return Array.from({ length: numPoints }, (_, i) => {
		const y = i * SEGMENT_LENGTH;
		return {
			x: ANCHOR_X,
			y,
			oldX: ANCHOR_X,
			oldY: y,
			prevX: ANCHOR_X,
			prevY: y,
			pinned: i === 0,
		};
	});
}

function renderX(p: Point, alpha: number) {
	return p.prevX + (p.x - p.prevX) * alpha;
}
function renderY(p: Point, alpha: number) {
	return p.prevY + (p.y - p.prevY) * alpha;
}

function buildPath(points: Point[], alpha: number): string {
	let d = `M ${renderX(points[0], alpha)} ${renderY(points[0], alpha)}`;
	for (let i = 1; i < points.length - 1; i++) {
		const x = renderX(points[i], alpha);
		const y = renderY(points[i], alpha);
		const nextX = renderX(points[i + 1], alpha);
		const nextY = renderY(points[i + 1], alpha);
		d += ` Q ${x} ${y} ${(x + nextX) / 2} ${(y + nextY) / 2}`;
	}
	const last = points[points.length - 1];
	d += ` L ${renderX(last, alpha)} ${renderY(last, alpha)}`;
	return d;
}

const INITIAL_PATH_D = buildPath(createPoints(DESKTOP_CONFIG.numPoints), 1);

export const Rope = () => {
	const isMobile = useMediaQuery("(max-width: 639px)");
	const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const knobRef = useRef<HTMLDivElement>(null);
	const pointsRef = useRef<Point[]>(createPoints(DESKTOP_CONFIG.numPoints));
	const draggingRef = useRef(false);
	const pulledPastThresholdRef = useRef(false);
	const wakeRef = useRef<() => void>(() => {});

	const { isDark, toggle } = useThemeTransition();
	const { playDragDown, playDragUp } = useAppSound();

	useEffect(() => {
		if (pointsRef.current.length !== config.numPoints) {
			pointsRef.current = createPoints(config.numPoints);
		}
		const points = pointsRef.current;
		const knob = points[points.length - 1];
		let rafId: number;
		let lastTime: number | null = null;
		let accumulator = 0;
		let settledSteps = 0;
		let running = true;

		const step = () => {
			const knobIsPinned = draggingRef.current;
			const isFixed = (p: Point) => p.pinned || (p === knob && knobIsPinned);
			let maxMovement = 0;

			for (let i = 1; i < points.length; i++) {
				const p = points[i];
				if (isFixed(p)) continue;
				const vx = (p.x - p.oldX) * DAMPING;
				const vy = (p.y - p.oldY) * DAMPING;
				p.oldX = p.x;
				p.oldY = p.y;
				p.x += vx;
				p.y += vy + GRAVITY;
				maxMovement = Math.max(maxMovement, Math.abs(vx), Math.abs(vy));
			}

			for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
				for (let i = 0; i < points.length - 1; i++) {
					const a = points[i];
					const b = points[i + 1];
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					const dist = Math.hypot(dx, dy) || 0.0001;
					const diff = (dist - SEGMENT_LENGTH) / dist;
					const offsetX = dx * 0.5 * diff;
					const offsetY = dy * 0.5 * diff;
					if (!isFixed(a)) {
						a.x += offsetX;
						a.y += offsetY;
					}
					if (!isFixed(b)) {
						b.x -= offsetX;
						b.y -= offsetY;
					}
				}
			}

			return maxMovement;
		};

		const wake = () => {
			if (running) return;
			running = true;
			settledSteps = 0;
			lastTime = null;
			rafId = requestAnimationFrame(tick);
		};
		wakeRef.current = wake;

		const tick = (time: number) => {
			if (lastTime === null) lastTime = time;

			accumulator += Math.min(
				time - lastTime,
				MAX_SUBSTEPS * REFERENCE_FRAME_MS,
			);
			lastTime = time;

			let steps = 0;
			let maxMovement = 0;
			while (accumulator >= REFERENCE_FRAME_MS && steps < MAX_SUBSTEPS) {
				for (const p of points) {
					p.prevX = p.x;
					p.prevY = p.y;
				}
				maxMovement = Math.max(maxMovement, step());
				accumulator -= REFERENCE_FRAME_MS;
				steps++;
			}
			if (steps === MAX_SUBSTEPS) accumulator = 0;
			const alpha = accumulator / REFERENCE_FRAME_MS;

			pathRef.current?.setAttribute("d", buildPath(points, alpha));
			if (knobRef.current) {
				const prev = points[points.length - 2];
				const kx = renderX(knob, alpha);
				const ky = renderY(knob, alpha);
				const angleDeg =
					Math.atan2(kx - renderX(prev, alpha), ky - renderY(prev, alpha)) *
					(180 / Math.PI);
				knobRef.current.style.transform = `translate(${kx - config.hitboxWidth / 2}px, ${ky}px) rotate(${-angleDeg}deg)`;
			}

			const stretch = Math.hypot(knob.x - ANCHOR_X, knob.y) - config.restLength;

			if (
				draggingRef.current &&
				!pulledPastThresholdRef.current &&
				stretch > config.stretchTrigger
			) {
				pulledPastThresholdRef.current = true;
				setPullFilter(BRIGHTNESS_FILTER);
				playDragDown();
			}

			if (!draggingRef.current && steps > 0) {
				settledSteps = maxMovement < SETTLE_EPSILON ? settledSteps + steps : 0;
			}
			if (!draggingRef.current && settledSteps >= SETTLE_STEPS) {
				running = false;
				return;
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [playDragDown, config]);

	const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		draggingRef.current = true;
		pulledPastThresholdRef.current = false;
		wakeRef.current();
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!draggingRef.current || !containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const localX = event.clientX - rect.left;
		const localY = Math.max(MIN_PULL_Y, event.clientY - rect.top);

		const points = pointsRef.current;
		const knob = points[points.length - 1];
		knob.oldX = knob.x;
		knob.oldY = knob.y;

		const dx = localX - ANCHOR_X;
		const dy = localY;
		const reach = Math.hypot(dx, dy) || 1;
		const scale = Math.min(1, config.maxPull / reach);
		knob.x = ANCHOR_X + dx * scale;
		knob.y = dy * scale;
	};

	const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!draggingRef.current) return;
		draggingRef.current = false;
		event.currentTarget.releasePointerCapture(event.pointerId);
		setPullFilter(null);

		if (pulledPastThresholdRef.current) {
			playDragUp();
			toggle();
		}
		pulledPastThresholdRef.current = false;
	};

	const path = "M 100 0 L 70 -150 L 30 -150 S 0 0 0 0";

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute top-0 right-1/8 z-50 sm:right-1/8 translate-x-1/2 drop-shadow-md drop-shadow-foreground/35"
			style={{ width: CONTAINER_WIDTH, height: config.containerHeight }}
		>
			<svg
				width={CONTAINER_WIDTH}
				height={config.containerHeight}
				className="absolute inset-0 overflow-visible"
			>
				<title>Theme toggle pull cord</title>
				<path
					ref={pathRef}
					d={INITIAL_PATH_D}
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					className="text-foreground/60"
				/>
			</svg>
			<div className="w-full h-full">
				<div
					ref={knobRef}
					role="switch"
					tabIndex={0}
					aria-checked={isDark}
					aria-label="Toggle color theme"
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					onPointerCancel={handlePointerUp}
					onDragStart={(event) => event.preventDefault()}
					draggable={false}
					className="pointer-events-auto absolute top-0 left-0 origin-top touch-none cursor-grab outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-ring/50 flex justify-center items-start select-none [-webkit-user-drag:none]"
					style={{
						width: config.hitboxWidth,
						height: config.hitboxHeight,
						transform: `translate(${ANCHOR_X - config.hitboxWidth / 2}px, ${config.restLength}px)`,
					}}
				>
					<svg
						width={KNOB_WIDTH}
						height={KNOB_HEIGHT}
						viewBox="0 -150 100 150"
						preserveAspectRatio="xMidYMid meet"
						className="text-primary select-none [-webkit-user-drag:none]"
						onDragStart={(event) => event.preventDefault()}
					>
						<title>Lightswitch knob</title>
						<path d={path} fill="currentColor" />
					</svg>
				</div>
			</div>
		</div>
	);
};
