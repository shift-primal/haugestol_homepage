import { QuestionMarkIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "#/components/shadcn/button";
import { Label } from "#/components/shadcn/label";
import { Rope } from "#/components/ui/Rope";
import { unlockAudioContext } from "#/lib/sound-engine";
import { m } from "#/paraglide/messages";

export const LightSwitch = () => {
    const [activated, setActivated] = useState(false);

    if (!activated) {
        return (
            <Button
                id="lightswitch-button"
                type="button"
                onClick={() => {
                    unlockAudioContext();
                    setActivated(true);
                }}
                aria-label={m.lightswitch_aria()}
                className="pointer-events-auto z-50 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground/60 outline-none transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 relative"
            >
                <QuestionMarkIcon />
                <Label
                    htmlFor="lightswitch-button"
                    className="absolute top-[120%] text-foreground/75 flex flex-col gap-0.75"
                >
                    {m.suspicious_button_label()}
                    <span className="text-[0.65rem] text-muted-foreground">
                        (please)
                    </span>
                </Label>
            </Button>
        );
    }

    return <Rope />;
};
