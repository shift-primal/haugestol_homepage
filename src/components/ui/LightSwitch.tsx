import { Rope } from "#/components/ui/Rope";

export const LightSwitch = () => (
    <div className="relative">
        <span
            aria-hidden
            className="absolute top-31 right-full mr-3 hidden flex-col sm:flex items-end gap-0.5 text-xs whitespace-nowrap text-foreground/75 select-none"
        ></span>
        <Rope />
    </div>
);
