import { usePageLoader } from "#/hooks/usePageLoader";
import { cn } from "#/lib/shadcn.utils";

export const PageLoader = () => {
    const hidden = usePageLoader();

    return (
        <>
            <div
                id="page-loader-fallback"
                aria-hidden
                className={cn(
                    "fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-slow ease-out",
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
