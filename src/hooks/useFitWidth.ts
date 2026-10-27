import { useEffect, useRef, useState } from "react";

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
