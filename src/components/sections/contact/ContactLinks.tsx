import {
    ArrowUpRightIcon,
    DiscordLogoIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "#/components/shadcn/separator";
import { SITE } from "#/content";
import { m } from "#/paraglide/messages";

const CONTACT_LINKS = [
    {
        label: "GitHub",
        href: SITE.github,
        icon: GithubLogoIcon,
    },
    {
        label: "LinkedIn",
        href: SITE.linkedin,
        icon: LinkedinLogoIcon,
    },
    {
        label: "Discord",
        href: SITE.discord,
        icon: DiscordLogoIcon,
    },
    {
        label: SITE.email,
        href: `mailto:${SITE.email}`,
        icon: EnvelopeIcon,
    },
];

export const ContactLinks = () => {
    return (
        <div className="flex w-full max-w-md flex-col pointer-events-auto lg:w-auto lg:flex-1 px-4 py-4 lg:px-8 lg:py-8 sm:max-w-full ">
            <div className="mb-4 hidden items-baseline justify-between lg:flex">
                <span>Links</span>
                <span className="font-mono text-xs text-muted-foreground">
                    {m.contact_response_time()}
                </span>
            </div>
            <div className="flex flex-col">
                {CONTACT_LINKS.map(({ label, href, icon: Icon }, index) => (
                    <Fragment key={label}>
                        {index !== 0 && (
                            <Separator className="bg-accent/75 my-1" />
                        )}
                        <a
                            href={href}
                            target={
                                href.startsWith("mailto:")
                                    ? undefined
                                    : "_blank"
                            }
                            rel={
                                href.startsWith("mailto:")
                                    ? undefined
                                    : "noreferrer"
                            }
                            className="group flex items-center gap-3 border-border py-2 transition-colors duration-150"
                        >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground/70 transition-colors group-hover:bg-foreground/20 group-hover:text-foreground duration-150">
                                <Icon className="size-4" />
                            </span>
                            <span
                                aria-hidden
                                className="text-muted-foreground"
                            >
                                {">"}
                            </span>
                            <span className="font-mono text-sm text-foreground/90 transition-colors group-hover:text-foreground duration-150">
                                {label}
                            </span>
                            <ArrowUpRightIcon className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 duration-150" />
                        </a>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
