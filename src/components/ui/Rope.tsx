import { useEffect, useRef } from "react";
import { useAppSound } from "#/hooks/useAppSound";
import { useThemeTransition } from "#/hooks/useThemeTransition";

// Primary tunables — adjust these to change how the rope looks and feels.
const CONTAINER_WIDTH = 256;
const SEGMENT_LENGTH = 14; // px per simulated link — controls curve resolution
const ROPE_LENGTH = 150; // target resting (unpulled) length of the cord
const PULL_RATIO = 1.62; // how far past its resting length it can be pulled
const STRETCH_TRIGGER_RATIO = 0.43; // fraction of resting length that must stretch taut before a pull arms the switch
const GRAVITY = 0.7;
const DAMPING = 0.985;
const CONSTRAINT_ITERATIONS = 8;
const MIN_PULL_Y = -100;
const KNOB_WIDTH = 16;
const KNOB_HEIGHT = 16;

// Derived — computed from the tunables above, don't edit directly.
const NUM_POINTS = Math.round(ROPE_LENGTH / SEGMENT_LENGTH) + 1;
const REST_LENGTH = SEGMENT_LENGTH * (NUM_POINTS - 1);
const MAX_PULL = REST_LENGTH * PULL_RATIO;
const CONTAINER_HEIGHT = MAX_PULL + KNOB_HEIGHT;
const STRETCH_TRIGGER = REST_LENGTH * STRETCH_TRIGGER_RATIO;
const REFERENCE_FRAME_MS = 1000 / 60;
const MAX_FRAME_MS = REFERENCE_FRAME_MS * 4;

const ANCHOR_X = CONTAINER_WIDTH / 1.5;

interface Point {
	x: number;
	y: number;
	oldX: number;
	oldY: number;
	pinned: boolean;
}

function createPoints(): Point[] {
	return Array.from({ length: NUM_POINTS }, (_, i) => {
		const y = i * SEGMENT_LENGTH;
		return { x: ANCHOR_X, y, oldX: ANCHOR_X, oldY: y, pinned: i === 0 };
	});
}

function buildPath(points: Point[]): string {
	let d = `M ${points[0].x} ${points[0].y}`;
	for (let i = 1; i < points.length - 1; i++) {
		const midX = (points[i].x + points[i + 1].x) / 2;
		const midY = (points[i].y + points[i + 1].y) / 2;
		d += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
	}
	const last = points[points.length - 1];
	d += ` L ${last.x} ${last.y}`;
	return d;
}

export const Rope = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const knobRef = useRef<HTMLButtonElement>(null);
	const pointsRef = useRef<Point[]>(createPoints());
	const draggingRef = useRef(false);
	const pulledPastThresholdRef = useRef(false);

	const { isDark, toggle } = useThemeTransition();
	const { playDragDown, playDragUp } = useAppSound();

	useEffect(() => {
		const points = pointsRef.current;
		const knob = points[points.length - 1];
		let rafId: number;
		let lastTime: number | null = null;

		const tick = (time: number) => {
			const dt =
				lastTime === null
					? REFERENCE_FRAME_MS
					: Math.min(time - lastTime, MAX_FRAME_MS);
			lastTime = time;
			const timeScale = dt / REFERENCE_FRAME_MS;
			const frameDamping = DAMPING ** timeScale;

			const knobIsPinned = draggingRef.current;
			const isFixed = (p: Point) => p.pinned || (p === knob && knobIsPinned);

			for (let i = 1; i < points.length; i++) {
				const p = points[i];
				if (isFixed(p)) continue;
				const vx = (p.x - p.oldX) * frameDamping;
				const vy = (p.y - p.oldY) * frameDamping;
				p.oldX = p.x;
				p.oldY = p.y;
				p.x += vx;
				p.y += vy + GRAVITY * timeScale;
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

			pathRef.current?.setAttribute("d", buildPath(points));
			if (knobRef.current) {
				knobRef.current.style.transform = `translate(${knob.x - KNOB_WIDTH / 2}px, ${knob.y}px)`;
			}

			const stretch = Math.hypot(knob.x - ANCHOR_X, knob.y) - REST_LENGTH;
			if (
				draggingRef.current &&
				!pulledPastThresholdRef.current &&
				stretch > STRETCH_TRIGGER
			) {
				pulledPastThresholdRef.current = true;
				playDragDown();
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [playDragDown]);

	const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		draggingRef.current = true;
		pulledPastThresholdRef.current = false;
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
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

	const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
		if (!draggingRef.current) return;
		draggingRef.current = false;
		event.currentTarget.releasePointerCapture(event.pointerId);

		if (pulledPastThresholdRef.current) {
			playDragUp();
			toggle();
		}
		pulledPastThresholdRef.current = false;
	};

	return (
		<div
			ref={containerRef}
			className="pointer-events-none fixed top-0 right-6 z-50 sm:right-10"
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
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					className="text-foreground/60"
				/>
			</svg>
			<button
				ref={knobRef}
				type="button"
				role="switch"
				aria-checked={isDark}
				aria-label="Toggle color theme"
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
				className="pointer-events-auto absolute top-0 left-0 touch-none cursor-grab border-2 border-foreground outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-ring/50 rounded-full"
				style={{
					width: KNOB_WIDTH,
					height: KNOB_HEIGHT,
					transform: `translate(${ANCHOR_X - KNOB_WIDTH / 2}px, ${REST_LENGTH}px)`,
				}}
			/>
		</div>
	);
};
