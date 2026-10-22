import { NO, US } from "country-flag-icons/react/3x2";
import { Button } from "#/components/shadcn/button";
import { m } from "#/paraglide/messages";
import { getLocale, setLocale } from "#/paraglide/runtime";

export const LanguageSwitcher = () => {
    const currentLocale = getLocale();
    const nextLocale = currentLocale === "no" ? "en" : "no";

    const NextFlag = nextLocale === "no" ? NO : US;

    return (
        <Button
            type="button"
            variant="pill"
            size="icon"
            onClick={() => {
                setLocale(nextLocale);
            }}
            aria-label={
                nextLocale === "no"
                    ? m.language_switch_to_norwegian_aria()
                    : m.language_switch_to_english_aria()
            }
            className="z-50"
        >
            <NextFlag className="size-3 rounded-[1px]" />
        </Button>
    );
};
