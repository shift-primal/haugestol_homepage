import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import MetaBalls from "#/components/shadcn/metaballs.tsx";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { PAGE_SCROLL_CONTAINER_ID } from "#/lib/scroll";

const DIMMED_OPACITY = 0.35;
const DIMMED_BLUR = 10;

export const Background = () => {
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 639px)");

    useEffect(() => {
        const container = document.getElementById(PAGE_SCROLL_CONTAINER_ID);
        const layer = ref.current;
        if (!container || !layer) return;

        const handleScroll = () => {
            const progress = Math.min(
                1,
                container.scrollTop / container.clientHeight
            );
            layer.style.opacity = String(1 - progress * (1 - DIMMED_OPACITY));
            layer.style.filter = `blur(${0 - progress * (0 - DIMMED_BLUR)}px)`;
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
                key={isMobile ? "mobile" : "desktop"}
                color={resolvedTheme === "dark" ? "#fafafa" : "#CB5E26"}
                cursorBallColor="#FF712F"
                cursorBallSize={1.5}
                variant="contour"
                motion="lava"
                ballCount={isMobile ? 6 : 12}
                animationSize={isMobile ? 26 : 20}
                gooeyness={0.7}
                stretch={0.2}
                wobble={0}
                enableTransparency
                speed={0.05}
                clumpFactor={2}
                hoverSmoothness={0.03}
                stickiness={0.5}
                lineWidth={1.5}
                rings={isMobile ? 3 : 4}
                fade={0.85}
                enableMouseInteraction={!isMobile}
                clickBurst={false}
                dpr={isMobile ? 1 : undefined}
                returnOnLeave={false}
                intro={false}
            />
        </div>
    );
};
