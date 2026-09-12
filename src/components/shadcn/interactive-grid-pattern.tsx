import { useEffect, useRef, useState } from "react";
import { cn } from "#/lib/shadcn.utils";

interface InteractiveGridPatternProps {
    cellWidth?: number;
    cellHeight?: number;
    className?: string;
    squaresClassName?: string;
}

export function InteractiveGridPattern({
    cellWidth = 40,
    cellHeight = 40,
    className,
    squaresClassName,
}: InteractiveGridPatternProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;
            const { width, height } = entry.contentRect;
            setSize({
                width,
                height,
            });
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const columns = Math.ceil(size.width / cellWidth) + 1;
    const rows = Math.ceil(size.height / cellHeight) + 1;

    return (
        <div
            ref={containerRef}
            className={cn("h-full w-full", className)}
        >
            {size.width > 0 && size.height > 0 && (
                <svg
                    aria-hidden
                    width={columns * cellWidth}
                    height={rows * cellHeight}
                    className="border-gray-400/30 select-none pointer-events-none sm:pointer-events-auto"
                >
                    {Array.from(
                        {
                            length: columns * rows,
                        },
                        (_, index) => {
                            const x = (index % columns) * cellWidth;
                            const y = Math.floor(index / columns) * cellHeight;
                            return (
                                <rect
                                    key={`${x}-${y}`}
                                    x={x}
                                    y={y}
                                    width={cellWidth}
                                    height={cellHeight}
                                    className={cn(
                                        "fill-transparent stroke-gray-400/30 transition-[fill] duration-fast ease-in-out",
                                        "lg:hover:fill-gray-600/10 lg:hover:dark:fill-gray-300/10 lg:not-[&:hover]:duration-1000",
                                        squaresClassName
                                    )}
                                />
                            );
                        }
                    )}
                </svg>
            )}
        </div>
    );
}
