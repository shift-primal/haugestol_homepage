import { NO, US } from "country-flag-icons/react/3x2";
import { HERO_SKIP_TYPING_SESSION_KEY } from "#/components/sections/hero/HeroIntro";
import { Button } from "#/components/shadcn/button";
import { m } from "#/paraglide/messages";
import { getLocale, setLocale } from "#/paraglide/runtime";

export const LanguageSwitcher = () => {
    const currentLocale = getLocale();
    const nextLocale = currentLocale === "no" ? "en" : "no";
    const CurrentFlag = currentLocale === "no" ? NO : US;

    return (
        <Button
            type="button"
            variant="pill"
            size="icon"
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
                    ? m.language_switch_to_norwegian_aria()
                    : m.language_switch_to_english_aria()
            }
            className="z-50"
        >
            <CurrentFlag className="size-3 rounded-[1px]" />
        </Button>
    );
};
