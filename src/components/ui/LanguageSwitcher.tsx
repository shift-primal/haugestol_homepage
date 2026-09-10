import { NO, US } from "country-flag-icons/react/3x2";
import { HERO_SKIP_TYPING_SESSION_KEY } from "#/components/sections/hero/HeroIntro";
import { Button } from "#/components/shadcn/button";
import { getLocale, setLocale } from "#/paraglide/runtime";

export const LanguageSwitcher = () => {
    const currentLocale = getLocale();
    const nextLocale = currentLocale === "no" ? "en" : "no";
    const CurrentFlag = currentLocale === "no" ? NO : US;

    return (
        <Button
            type="button"
            onClick={() => {
                try {
                    sessionStorage.setItem(HERO_SKIP_TYPING_SESSION_KEY, "1");
                } catch {
                    // sessionStorage unavailable (e.g. private browsing) - animation will just replay
                }
                setLocale(nextLocale);
            }}
            aria-label={
                nextLocale === "no"
                    ? "Switch language to Norwegian"
                    : "Switch language to English"
            }
            className="pointer-events-auto z-50 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground/60 outline-none transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50"
        >
            <CurrentFlag className="size-3 rounded-[1px]" />
        </Button>
    );
};
