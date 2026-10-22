import { useEffect, useRef, useState } from "react";

// Scale factor (≤ 1) that fits content of a fixed `contentWidth` (px) into
// the width of the returned ref's element. Used to shrink the A4 CV on
// narrow screens; print ignores it.
export const useFitWidth = <T extends HTMLElement>(contentWidth: number) => {
    const ref = useRef<T>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) return;
            setScale(Math.min(1, entry.contentRect.width / contentWidth));
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, [
        contentWidth,
    ]);

    return {
        ref,
        scale,
    };
};
