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
            variant="pill"
            size="icon"
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            onClick={scrollPageToTop}
            aria-label={m.scroll_to_top_aria()}
            className={cn(
                "fixed right-4 bottom-4 z-50 duration-300 sm:right-8 sm:bottom-8",
                visible
                    ? "opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
            )}
        >
            <ArrowUpIcon />
        </Button>
    );
};
