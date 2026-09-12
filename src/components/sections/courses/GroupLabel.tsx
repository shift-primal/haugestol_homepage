import type { Icon } from "@phosphor-icons/react";
import { cn } from "#/lib/shadcn.utils";

export const GroupLabel = ({
    text,
    icon: Icon,
    className,
}: {
    text: string;
    icon?: Icon;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "border-b border-border bg-foreground/5 px-4 py-2 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase flex items-center gap-2",
                className
            )}
        >
            {Icon && <Icon />}
            {text}
        </div>
    );
};
