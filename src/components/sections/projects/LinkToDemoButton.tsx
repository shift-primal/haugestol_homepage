import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "#/components/shadcn/popover";
import { m } from "#/paraglide/messages";

export const LinkToDemoButton = ({
    liveHref,
    ctaText,
}: {
    liveHref?: string;
    ctaText: string;
}) => (
    <Popover>
        <PopoverTrigger
            nativeButton={false}
            render={({ ref, ...triggerProps }) => (
                <Button
                    disabled={!liveHref}
                    variant="outline"
                    className="grow"
                    nativeButton={false}
                    render={(buttonProps) => (
                        <a
                            {...buttonProps}
                            {...triggerProps}
                            ref={ref}
                            href={liveHref}
                            rel="noopener"
                            target="_blank"
                        >
                            <span>{ctaText}</span>
                            <ArrowRightIcon data-icon="inline-end" />
                        </a>
                    )}
                />
            )}
        />

        {!liveHref && (
            <PopoverContent className="w-64 bg-destructive/75 text-xs/relaxed">
                {m.project_not_live_notice()}
            </PopoverContent>
        )}
    </Popover>
);
