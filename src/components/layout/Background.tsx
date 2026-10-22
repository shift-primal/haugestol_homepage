import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import MetaBalls from "#/components/shadcn/metaballs.tsx";
import { PAGE_SCROLL_CONTAINER_ID } from "#/lib/scroll";

// full strength behind the hero, calmer behind the body text
const DIMMED_OPACITY = 0.35;

export const Background = () => {
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = document.getElementById(PAGE_SCROLL_CONTAINER_ID);
        const layer = ref.current;
        if (!container || !layer) return;

        // write the style directly: re-rendering on every scroll event
        // would re-render the canvas component too
        const handleScroll = () => {
            const progress = Math.min(
                1,
                container.scrollTop / container.clientHeight
            );
            layer.style.opacity = String(1 - progress * (1 - DIMMED_OPACITY));
        };
        handleScroll();
        container.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={ref}
            className="fixed inset-0 -z-10 pointer-events-none print:hidden"
        >
            <MetaBalls
                color={resolvedTheme === "dark" ? "#fafafa" : "#CB5E26"}
                cursorBallColor="#FF712F"
                cursorBallSize={1.5}
                variant="contour"
                motion="lava"
                ballCount={12}
                animationSize={20}
                gooeyness={0.7}
                stretch={0.2}
                wobble={0}
                enableTransparency
                speed={0.05}
                clumpFactor={2}
                hoverSmoothness={0.03}
                stickiness={0.5}
                lineWidth={1.5}
                rings={4}
                fade={0.85}
                enableMouseInteraction={true}
                clickBurst
                returnOnLeave={false}
                intro={false}
            />
        </div>
    );
};
