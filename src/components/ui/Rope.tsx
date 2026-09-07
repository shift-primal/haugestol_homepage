import { useEffect, useRef } from "react";
import { useAppSound } from "#/hooks/useAppSound";
import { useThemeTransition } from "#/hooks/useThemeTransition";
import { setPullFilter } from "#/lib/pull-filter";

// Intensity for the brigthness filter on drag down
const BRIGHTNESS_FILTER = 0.25;

// Primary tunables — adjust these to change how the rope looks and feels.
const CONTAINER_WIDTH = 32;
const SEGMENT_LENGTH = 14; // px per simulated link — controls curve resolution
const ROPE_LENGTH = 150; // target resting (unpulled) length of the cord
const PULL_RATIO = 1.62; // how far past its resting length it can be pulled
const STRETCH_TRIGGER_RATIO = 0.43; // fraction of resting length that must stretch taut before a pull arms the switch
const GRAVITY = 0.7;
const DAMPING = 0.985;
const CONSTRAINT_ITERATIONS = 8;
const MIN_PULL_Y = -100;
const KNOB_WIDTH = 16;
const KNOB_HEIGHT = 24;

// Derived — computed from the tunables above, don't edit directly.
const NUM_POINTS = Math.round(ROPE_LENGTH / SEGMENT_LENGTH) + 1;
const REST_LENGTH = SEGMENT_LENGTH * (NUM_POINTS - 1);
const MAX_PULL = REST_LENGTH * PULL_RATIO;
const CONTAINER_HEIGHT = MAX_PULL + KNOB_HEIGHT;
const STRETCH_TRIGGER = REST_LENGTH * STRETCH_TRIGGER_RATIO;
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

function createPoints(): Point[] {
	return Array.from({ length: NUM_POINTS }, (_, i) => {
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

const INITIAL_PATH_D = buildPath(createPoints(), 1);

export const Rope = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const knobRef = useRef<HTMLDivElement>(null);
	const pointsRef = useRef<Point[]>(createPoints());
	const draggingRef = useRef(false);
	const pulledPastThresholdRef = useRef(false);
	const wakeRef = useRef<() => void>(() => {});

	const { isDark, toggle } = useThemeTransition();
	const { playDragDown, playDragUp } = useAppSound();

	useEffect(() => {
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
				knobRef.current.style.transform = `translate(${kx - KNOB_WIDTH / 2}px, ${ky}px) rotate(${-angleDeg}deg)`;
			}

			const stretch = Math.hypot(knob.x - ANCHOR_X, knob.y) - REST_LENGTH;

			if (
				draggingRef.current &&
				!pulledPastThresholdRef.current &&
				stretch > STRETCH_TRIGGER
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
	}, [playDragDown]);

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
		const scale = Math.min(1, MAX_PULL / reach);
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

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute top-0 right-1/4 z-50 sm:right-1/8 translate-x-1/2"
			style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
		>
			<svg
				width={CONTAINER_WIDTH}
				height={CONTAINER_HEIGHT}
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
					className="pointer-events-auto absolute top-0 left-0 origin-top touch-none cursor-grab outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-ring/50 rounded-t-full bg-primary"
					style={{
						width: KNOB_WIDTH,
						height: KNOB_HEIGHT,
						transform: `translate(${ANCHOR_X - KNOB_WIDTH / 2}px, ${REST_LENGTH}px)`,
					}}
				/>
			</div>
		</div>
	);
};
