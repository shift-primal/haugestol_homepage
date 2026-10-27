import { useAppSound } from "#/hooks/useAppSound";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { useRopeCord } from "#/hooks/useRopeCord";
import { useThemeTransition } from "#/hooks/useThemeTransition";
import { setPullFilter } from "#/lib/pull-filter";
import {
    CONTAINER_WIDTH,
    DESKTOP_CONFIG,
    KNOB_HEIGHT,
    KNOB_WIDTH,
    MOBILE_CONFIG,
} from "#/lib/rope-physics";
import { unlockAudioContext } from "#/lib/sound-engine";
import { m } from "#/paraglide/messages";

const BRIGHTNESS_FILTER = 0.25;

const KNOB_PATH = `M 97.65 -11.77
L 72.94 -135.29
Q 70 -150 55 -150
L 45 -150
Q 30 -150 27.06 -135.29
L 2.35 -11.77
Q 0 0 12 0
L 88 0
Q 100 0 97.65 -11.77
Z`;

export const Rope = () => {
    const isMobile = useMediaQuery("(max-width: 639px)");
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

    const { isDark, toggle } = useThemeTransition();
    const { playDragDown, playDragUp } = useAppSound();

    const {
        containerRef,
        pathRef,
        knobRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        simulatePull,
        initialPathD,
        initialKnobX,
        initialKnobY,
        initialKnobAngleDeg,
    } = useRopeCord({
        config,
        reducedMotion,
        onStretchArmed: () => {
            setPullFilter(BRIGHTNESS_FILTER);
            playDragDown();
        },
        onRelease: (armed) => {
            setPullFilter(null);
            if (armed) {
                playDragUp();
                const knob = knobRef.current?.getBoundingClientRect();
                toggle(
                    knob && {
                        x: knob.left + knob.width / 2,
                        y: knob.top + knob.height / 2,
                    }
                );
            }
        },
    });

    return (
        <div
            ref={containerRef}
            className="pointer-events-none relative z-50 -mt-8"
            style={{
                width: CONTAINER_WIDTH,
                height: config.containerHeight,
            }}
        >
            <svg
                aria-hidden="true"
                width={CONTAINER_WIDTH}
                height={config.containerHeight}
                className="absolute inset-0 overflow-visible"
            >
                <path
                    ref={pathRef}
                    d={initialPathD}
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
                    aria-label={m.theme_toggle_aria()}
                    onPointerDown={(event) => {
                        unlockAudioContext();
                        handlePointerDown(event);
                    }}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        unlockAudioContext();
                        simulatePull();
                    }}
                    onDragStart={(event) => event.preventDefault()}
                    draggable={false}
                    className="pointer-events-auto origin-top touch-none cursor-grab outline-none active:cursor-grabbing focus-ring flex justify-center items-start select-none [-webkit-user-drag:none]"
                    style={{
                        width: config.hitboxWidth,
                        height: config.hitboxHeight,
                        transform: `translate(${initialKnobX - config.hitboxWidth / 2}px, ${initialKnobY}px) rotate(${initialKnobAngleDeg}deg)`,
                    }}
                >
                    <svg
                        aria-hidden="true"
                        width={KNOB_WIDTH}
                        height={KNOB_HEIGHT}
                        viewBox="0 -150 100 150"
                        preserveAspectRatio="xMidYMid meet"
                        className="text-foreground drop-shadow-sm select-none [-webkit-user-drag:none]"
                        onDragStart={(event) => event.preventDefault()}
                    >
                        <path
                            d={KNOB_PATH}
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
