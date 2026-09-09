import {
    DiscordLogoIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { SITE } from "#/lib/content";

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
        <div className="flex w-full max-w-md flex-col gap-2 pointer-events-auto lg:w-auto lg:flex-1 py-0 px-4 lg:px-8 lg:py-8 sm:max-w-full lg:backdrop-blur-md border-0 lg:border border-border">
            <span className="mb-4 hidden lg:block">Links</span>
            {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="group flex w-fit items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <span aria-hidden>{">"}</span>
                    <Icon className="size-4" />
                    <span className="group-hover:underline">{label}</span>
                </a>
            ))}
        </div>
    );
};
