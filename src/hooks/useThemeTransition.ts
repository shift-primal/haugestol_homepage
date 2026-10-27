import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const motionToken = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const toMs = (time: string) =>
    time.endsWith("ms")
        ? Number.parseFloat(time)
        : Number.parseFloat(time) * 1000;

export function useThemeTransition() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";

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
                .catch(() => {});
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
