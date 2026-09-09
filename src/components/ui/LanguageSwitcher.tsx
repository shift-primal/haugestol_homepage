import { NO, US } from "country-flag-icons/react/3x2";
import { Button } from "#/components/shadcn/button";
import { getLocale, setLocale } from "#/paraglide/runtime";

export const LanguageSwitcher = () => {
    const currentLocale = getLocale();
    const nextLocale = currentLocale === "no" ? "en" : "no";
    const CurrentFlag = currentLocale === "no" ? NO : US;

    return (
        <Button
            type="button"
            onClick={() => setLocale(nextLocale)}
            aria-label={
                nextLocale === "no"
                    ? "Switch language to Norwegian"
                    : "Switch language to English"
            }
            className="pointer-events-auto absolute top-10 left-1/4 z-50 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground/60 outline-none transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50"
        >
            <CurrentFlag className="size-3 rounded-[1px]" />
        </Button>
    );
};
