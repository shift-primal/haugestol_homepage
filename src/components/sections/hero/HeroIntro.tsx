import { useEffect, useState } from "react";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { Kicker } from "#/components/ui/Kicker";
import { getHero, SITE } from "#/content";
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
            <Kicker text="// hello-world" />
            <div className="relative min-w-fit pointer-events-auto">
                <span
                    aria-hidden
                    className={cn("invisible inline-block", HEADING_CLASSNAME)}
                >
                    {NAME_WITH_LINE_BREAK}
                </span>
                <TypingAnimation
                    className={cn("absolute inset-0", HEADING_CLASSNAME)}
                    instant={skipTyping}
                >
                    {NAME_WITH_LINE_BREAK}
                </TypingAnimation>
            </div>
            <div className="min-h-10">
                <WordRotate
                    words={getHero().technologies}
                    className="text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
                />
            </div>
        </div>
    );
};
