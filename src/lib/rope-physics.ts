export interface Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    prevX: number;
    prevY: number;
    pinned: boolean;
}

export interface RopeConfig {
    numPoints: number;
    restLength: number;
    maxPull: number;
    containerHeight: number;
    stretchTrigger: number;
    hitboxWidth: number;
    hitboxHeight: number;
}

// Layout tunables — adjust these to change how the rope looks and feels.
export const CONTAINER_WIDTH = 32;
export const SEGMENT_LENGTH = 14; // px per simulated link — controls curve resolution
export const KNOB_WIDTH = 24;
export const KNOB_HEIGHT = 32;
export const ANCHOR_X = CONTAINER_WIDTH / 2;

const ROPE_LENGTH_DESKTOP = 150; // target resting (unpulled) length of the cord
const ROPE_LENGTH_MOBILE = 100;
const PULL_RATIO_DESKTOP = 1.62; // how far past its resting length it can be pulled
const PULL_RATIO_MOBILE = 1.62;
const STRETCH_TRIGGER_RATIO = 0.43; // fraction of resting length that must stretch taut before a pull arms the switch
const HITBOX_EXTRA_SIDE_DESKTOP = 10;
const HITBOX_EXTRA_BOTTOM_DESKTOP = 10;
const HITBOX_EXTRA_SIDE_MOBILE = 24;
const HITBOX_EXTRA_BOTTOM_MOBILE = 24;

// Physics tunables.
export const GRAVITY = 0.7;
export const DAMPING = 0.985;
export const CONSTRAINT_ITERATIONS = 8;
export const MIN_PULL_Y = -100;
// The retracted pose is a straight, correctly-spaced line tilted this many
// degrees off vertical (from the anchor, pointing up) — so it starts as a
// valid, unstretched chain above the screen and swings down like a released
// pendulum instead of snapping/popping into place.
export const FALL_TILT_DEGREES = 20;

// Simulation loop tunables.
export const REFERENCE_FRAME_MS = 1000 / 60;
export const MAX_SUBSTEPS = 10; // caps catch-up after a stall (tab/focus change) instead of injecting one big kick
export const SETTLE_EPSILON = 0.02; // px of per-step movement below which a point counts as still
export const SETTLE_STEPS = 45; // consecutive still steps (~0.75s of sim time) before the loop parks itself

function computeConfig(
    ropeLength: number,
    pullRatio: number,
    hitboxExtraSide: number,
    hitboxExtraBottom: number
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

export const DESKTOP_CONFIG = computeConfig(
    ROPE_LENGTH_DESKTOP,
    PULL_RATIO_DESKTOP,
    HITBOX_EXTRA_SIDE_DESKTOP,
    HITBOX_EXTRA_BOTTOM_DESKTOP
);
export const MOBILE_CONFIG = computeConfig(
    ROPE_LENGTH_MOBILE,
    PULL_RATIO_MOBILE,
    HITBOX_EXTRA_SIDE_MOBILE,
    HITBOX_EXTRA_BOTTOM_MOBILE
);

export function createPoints(numPoints: number): Point[] {
    return Array.from(
        {
            length: numPoints,
        },
        (_, i) => {
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
        }
    );
}

// A straight line from the anchor, tilted up and to one side, with every
// point already exactly SEGMENT_LENGTH apart — so no constraint is violated
// at rest. Released with nothing holding it, it swings down through vertical
// under gravity like a dropped pendulum, landing in the normal hang.
export function createFallPoints(numPoints: number): Point[] {
    const angle = (FALL_TILT_DEGREES * Math.PI) / 180;
    const dirX = -Math.sin(angle);
    const dirY = -Math.cos(angle);
    return Array.from(
        {
            length: numPoints,
        },
        (_, i) => {
            const x = ANCHOR_X + i * SEGMENT_LENGTH * dirX;
            const y = i * SEGMENT_LENGTH * dirY;
            return {
                x,
                y,
                oldX: x,
                oldY: y,
                prevX: x,
                prevY: y,
                pinned: i === 0,
            };
        }
    );
}

export function renderX(p: Point, alpha: number) {
    return p.prevX + (p.x - p.prevX) * alpha;
}
export function renderY(p: Point, alpha: number) {
    return p.prevY + (p.y - p.prevY) * alpha;
}

export function buildPath(points: Point[], alpha: number): string {
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

// One physics tick: integrates unfixed points and relaxes segment-length
// constraints along the chain. Mutates `points` in place; returns the
// largest per-point movement, used by the caller to detect settling.
export function stepSimulation(
    points: Point[],
    isFixed: (p: Point) => boolean
): number {
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
}
