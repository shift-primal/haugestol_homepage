import { useEffect, useState } from "react";
import { cn } from "#/lib/shadcn.utils";

const MAX_WAIT_MS = 1800;
const MIN_VISIBLE_MS = 150;

const waitForPageReady = () =>
    new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            resolve();
        };

        // give layout (fonts, images, ResizeObserver-driven content) a couple of
        // frames to settle after everything has loaded before revealing the page
        const settle = () =>
            requestAnimationFrame(() => requestAnimationFrame(finish));

        const whenLoaded = () => {
            if (document.fonts?.ready) {
                document.fonts.ready.then(settle, settle);
            } else {
                settle();
            }
        };

        if (document.readyState === "complete") {
            whenLoaded();
        } else {
            window.addEventListener("load", whenLoaded, {
                once: true,
            });
        }

        // never block the page forever if something above doesn't resolve
        setTimeout(finish, MAX_WAIT_MS);
    });

export const PageLoader = () => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const start = performance.now();
        let cancelled = false;

        waitForPageReady().then(() => {
            if (cancelled) return;
            const remaining = Math.max(
                0,
                MIN_VISIBLE_MS - (performance.now() - start)
            );
            window.setTimeout(() => {
                if (!cancelled) setHidden(true);
            }, remaining);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <div
                id="page-loader-fallback"
                aria-hidden
                className={cn(
                    "fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-300 ease-out",
                    hidden ? "pointer-events-none opacity-0" : "opacity-100"
                )}
            >
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground/50" />
            </div>
            <noscript>
                <style>{"#page-loader-fallback{display:none}"}</style>
            </noscript>
        </>
    );
};
