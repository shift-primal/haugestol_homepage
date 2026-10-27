import { useEffect, useState } from "react";

const MAX_WAIT_MS = 1000;
const MIN_VISIBLE_MS = 150;

const waitForPageReady = (maxWait: number) =>
    new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            resolve();
        };

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

        setTimeout(finish, maxWait);
    });

export const usePageLoader = () => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const start = performance.now();
        let cancelled = false;

        waitForPageReady(MAX_WAIT_MS).then(() => {
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

    return hidden;
};
