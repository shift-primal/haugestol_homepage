import { ArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "#/components/shadcn/button";
import { PAGE_SCROLL_CONTAINER_ID, scrollPageToTop } from "#/lib/scroll";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

const SCROLL_THRESHOLD_PX = 400;

export const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const container = document.getElementById(PAGE_SCROLL_CONTAINER_ID);
        if (!container) return;

        const handleScroll = () => {
            setVisible(container.scrollTop > SCROLL_THRESHOLD_PX);
        };
        handleScroll();
        container.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Button
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            onClick={scrollPageToTop}
            aria-label={m.scroll_to_top_aria()}
            className={cn(
                "pointer-events-auto fixed right-4 bottom-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground/60 outline-none transition-all duration-300 hover:bg-foreground/20 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 sm:right-8 sm:bottom-8",
                visible
                    ? "opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
            )}
        >
            <ArrowUpIcon />
        </Button>
    );
};
