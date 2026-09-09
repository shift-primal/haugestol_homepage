import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "#/components/shadcn/button";
import { Rope } from "#/components/ui/Rope";
import { useThemeTransition } from "#/hooks/useThemeTransition";
import { unlockAudioContext } from "#/lib/sound-engine";

export const LightSwitch = () => {
    const [activated, setActivated] = useState(false);
    const { isDark } = useThemeTransition();

    if (!activated) {
        return (
            <Button
                type="button"
                onClick={() => {
                    unlockAudioContext();
                    setActivated(true);
                }}
                aria-label="Turn on the light"
                className="pointer-events-auto absolute top-10 right-1/4 z-50 flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground/60 outline-none transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50"
            >
                {isDark ? <MoonIcon /> : <SunIcon />}
            </Button>
        );
    }

    return <Rope />;
};
