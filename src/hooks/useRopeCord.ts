import { useEffect, useMemo, useRef } from "react";
import {
	ANCHOR_X,
	buildPath,
	createFallPoints,
	createPoints,
	MAX_SUBSTEPS,
	MIN_PULL_Y,
	type Point,
	REFERENCE_FRAME_MS,
	type RopeConfig,
	renderX,
	renderY,
	SETTLE_EPSILON,
	SETTLE_STEPS,
	stepSimulation,
} from "#/lib/rope-physics";

interface UseRopeCordOptions {
	config: RopeConfig;
	/** Fires once per drag, the moment the pull stretches past the arm threshold. */
	onStretchArmed: () => void;
	/** Fires on pointer release; `armed` is true if the pull had cleared the threshold. */
	onRelease: (armed: boolean) => void;
}

// Drives the verlet rope simulation and drag interaction for a cord that
// always starts bunched at the anchor and falls into its resting hang on
// mount — see `createFallPoints` in rope-physics.ts.
export function useRopeCord({
	config,
	onStretchArmed,
	onRelease,
}: UseRopeCordOptions) {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const knobRef = useRef<HTMLDivElement>(null);
	const pointsRef = useRef<Point[]>(createFallPoints(config.numPoints));
	const draggingRef = useRef(false);
	const pulledPastThresholdRef = useRef(false);
	const wakeRef = useRef<() => void>(() => {});
	// True once the fall has actually finished (or a drag has started) — not
	// merely once this effect has run once. useMediaQuery starts every
	// consumer at its SSR-safe default and corrects itself in an effect after
	// mount, so on a phone `config` can flip from desktop to mobile while the
	// cord is still mid-fall; without this distinction that correction reads
	// as "already resting, just resize" and snaps the fall away entirely.
	const hasSettledRef = useRef(false);

	// Refs so the physics effect doesn't need these callbacks as deps.
	const onStretchArmedRef = useRef(onStretchArmed);
	const onReleaseRef = useRef(onRelease);
	onStretchArmedRef.current = onStretchArmed;
	onReleaseRef.current = onRelease;

	useEffect(() => {
		if (pointsRef.current.length !== config.numPoints) {
			// Still falling (or hasn't started yet): reseed the fall pose for the
			// corrected breakpoint instead of losing the drop. Already settled:
			// just resize straight to the resting pose, no need to re-fall.
			pointsRef.current = hasSettledRef.current
				? createPoints(config.numPoints)
				: createFallPoints(config.numPoints);
		}

		const points = pointsRef.current;
		const knob = points[points.length - 1];
		let rafId: number;
		let lastTime: number | null = null;
		let accumulator = 0;
		let settledSteps = 0;
		let running = true;

		const isFixed = (p: Point) =>
			p.pinned || (p === knob && draggingRef.current);

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
				maxMovement = Math.max(maxMovement, stepSimulation(points, isFixed));
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
				onStretchArmedRef.current();
			}

			if (!draggingRef.current && steps > 0) {
				settledSteps = maxMovement < SETTLE_EPSILON ? settledSteps + steps : 0;
			}
			if (!draggingRef.current && settledSteps >= SETTLE_STEPS) {
				hasSettledRef.current = true;
				running = false;
				return;
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [config]);

	const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		draggingRef.current = true;
		pulledPastThresholdRef.current = false;
		hasSettledRef.current = true;
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
		const armed = pulledPastThresholdRef.current;
		pulledPastThresholdRef.current = false;
		onReleaseRef.current(armed);
	};

	// Static pose for the very first paint, before the loop's first tick runs.
	const initialPose = useMemo(
		() => createFallPoints(config.numPoints),
		[config.numPoints],
	);
	const initialPathD = buildPath(initialPose, 1);
	const initialKnob = initialPose[initialPose.length - 1];
	const initialPrev = initialPose[initialPose.length - 2];
	const initialKnobAngleDeg =
		-Math.atan2(initialKnob.x - initialPrev.x, initialKnob.y - initialPrev.y) *
		(180 / Math.PI);

	return {
		containerRef,
		pathRef,
		knobRef,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		initialPathD,
		initialKnobX: initialKnob.x,
		initialKnobY: initialKnob.y,
		initialKnobAngleDeg,
	};
}
