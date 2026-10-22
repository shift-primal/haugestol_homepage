import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const REVEAL_MS = 700;
const REVEAL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

export function useThemeTransition() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";

    // With an origin (the cord knob), the new theme grows out of it as a
    // circle. Without one, or with reduced motion or no View Transitions,
    // the theme just switches.
    const toggle = useCallback(
        (origin?: { x: number; y: number }) => {
            const next = isDark ? "light" : "dark";
            const root = document.documentElement;
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (!origin || reducedMotion || !document.startViewTransition) {
                setTheme(next);
                return;
            }

            const transition = document.startViewTransition(() => {
                // apply the class here so the new snapshot is ready at once;
                // next-themes sets the same class when its state catches up
                root.classList.remove(isDark ? "dark" : "light");
                root.classList.add(next);
                root.style.colorScheme = next;
                setTheme(next);
            });

            transition.ready
                .then(() => {
                    const radius = Math.hypot(
                        Math.max(origin.x, window.innerWidth - origin.x),
                        Math.max(origin.y, window.innerHeight - origin.y)
                    );
                    const at = `at ${origin.x}px ${origin.y}px`;
                    root.animate(
                        {
                            clipPath: [
                                `circle(0px ${at})`,
                                `circle(${radius}px ${at})`,
                            ],
                        },
                        {
                            duration: REVEAL_MS,
                            easing: REVEAL_EASING,
                            pseudoElement: "::view-transition-new(root)",
                        }
                    );
                })
                .catch(() => {
                    // transition skipped (e.g. tab hidden): the theme still changed
                });
        },
        [
            isDark,
            setTheme,
        ]
    );

    return {
        isDark,
        toggle,
    };
}
