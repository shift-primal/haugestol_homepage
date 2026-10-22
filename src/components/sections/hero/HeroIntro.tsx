import { useEffect, useState } from "react";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { SITE } from "#/content";
import { cn } from "#/lib/shadcn.utils";

const NAME_WITH_LINE_BREAK = SITE.name.replace(" ", "\n");

const HEADING_CLASSNAME =
    "whitespace-pre-line text-5xl font-bold tracking-tight sm:whitespace-nowrap md:text-6xl lg:text-7xl";

// set by LanguageSwitcher right before it triggers the locale-switch reload,
// so we can tell "reloaded because of a locale switch" apart from a plain refresh
export const HERO_SKIP_TYPING_SESSION_KEY = "hero-intro-skip-typing";

export const HeroIntro = () => {
    const [skipTyping, setSkipTyping] = useState(false);

    useEffect(() => {
        try {
            if (sessionStorage.getItem(HERO_SKIP_TYPING_SESSION_KEY)) {
                setSkipTyping(true);
                sessionStorage.removeItem(HERO_SKIP_TYPING_SESSION_KEY);
            }
        } catch {
            // sessionStorage unavailable (e.g. private browsing) - just play the animation
        }
    }, []);

    return (
        <div>
            <div className="relative min-w-fit pointer-events-auto">
                {/* the real heading: server-rendered, sizes the box, read by
                    screen readers and crawlers; the typing overlay is decoration */}
                <h1
                    className={cn(
                        "inline-block text-transparent",
                        HEADING_CLASSNAME
                    )}
                >
                    {NAME_WITH_LINE_BREAK}
                </h1>
                <TypingAnimation
                    aria-hidden
                    className={cn("absolute inset-0", HEADING_CLASSNAME)}
                    as="p"
                    instant={skipTyping}
                >
                    {NAME_WITH_LINE_BREAK}
                </TypingAnimation>
            </div>
        </div>
    );
};
