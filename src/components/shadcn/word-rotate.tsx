import { AnimatePresence, type MotionProps, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useMediaQuery } from "#/hooks/useMediaQuery";
import { cn } from "#/lib/shadcn.utils";

interface WordRotateProps {
    words: string[];
    duration?: number;
    motionProps?: MotionProps;
    className?: string;
}

export function WordRotate({
    words,
    duration = 2500,
    motionProps = {
        initial: {
            opacity: 0,
            y: -50,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            y: 50,
        },
        transition: {
            duration: 0.5,
            ease: "circInOut",
        },
    },
    className,
}: WordRotateProps) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const prefersReducedMotion = useMediaQuery(
        "(prefers-reduced-motion: reduce)"
    );

    useEffect(() => {
        // Auto-cycling text needs a way to pause (WCAG 2.2.2) and shouldn't
        // run at all for reduced-motion users.
        if (paused || prefersReducedMotion) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [
        words,
        duration,
        paused,
        prefersReducedMotion,
    ]);

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: hover-only pause for decorative auto-cycling text (WCAG 2.2.2); nothing inside is focusable, so focus/blur wouldn't fire
        <div
            className="overflow-hidden mt-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    className={cn("inline-block", className)}
                    {...(prefersReducedMotion
                        ? {
                              initial: false,
                              animate: {
                                  opacity: 1,
                                  y: 0,
                              },
                          }
                        : motionProps)}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
