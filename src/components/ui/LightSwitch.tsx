import { Rope } from "#/components/ui/Rope";
import { m } from "#/paraglide/messages";

// The pull cord hangs in view from the start; the label is a nudge for
// sighted visitors, the cord itself carries the accessible name.
export const LightSwitch = () => (
    <div className="relative">
        <span
            aria-hidden
            className="absolute top-31 right-full mr-3 hidden flex-col sm:flex items-end gap-0.5 text-xs whitespace-nowrap text-foreground/75 select-none"
        >
            {m.suspicious_button_label()}
            <span className="text-muted-foreground">
                {m.suspicious_button_hint()}
            </span>
        </span>
        <Rope />
    </div>
);
