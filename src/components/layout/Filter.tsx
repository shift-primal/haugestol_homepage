import { useEffect, useRef } from "react";
import { subscribePullFilter } from "#/lib/pull-filter";

export const Filter = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return subscribePullFilter((brightness) => {
            const el = ref.current;
            if (!el) return;

            const filter =
                brightness === null ? "none" : `brightness(${brightness})`;
            el.style.backdropFilter = filter;
            el.style.setProperty("-webkit-backdrop-filter", filter);
        });
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-40"
        />
    );
};
