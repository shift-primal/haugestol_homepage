import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

// the reveal's timing comes from the motion tokens in styles.css
const motionToken = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// the CSS minifier may rewrite 700ms as .7s
const toMs = (time: string) =>
    time.endsWith("ms")
        ? Number.parseFloat(time)
        : Number.parseFloat(time) * 1000;

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
                root.classList.add("theme-switching");
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
                            duration: toMs(
                                motionToken("--transition-duration-reveal")
                            ),
                            easing: motionToken("--ease-out-expo"),
                            pseudoElement: "::view-transition-new(root)",
                        }
                    );
                })
                .catch(() => {
                    // transition skipped (e.g. tab hidden): the theme still changed
                });
            transition.finished.finally(() =>
                root.classList.remove("theme-switching")
            );
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
