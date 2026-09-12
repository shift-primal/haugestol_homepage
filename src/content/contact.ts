import {
    DiscordLogoIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { SITE } from "#/content/site";

export const CONTACT_LINKS = [
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
