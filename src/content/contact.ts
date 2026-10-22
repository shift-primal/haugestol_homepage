import {
    DiscordLogoIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
    PhoneIcon,
} from "@phosphor-icons/react";
import { cvNo } from "#/content/cv/no";
import type { CvContactSection } from "#/content/cv/types";
import { SITE } from "#/content/site";

// the phone number is written once, in the CV data
const phone = cvNo.sidebar
    .find((section): section is CvContactSection => section.type === "contact")
    ?.items.find((item) => item.icon === "phone");

// most direct first: a recruiter should see email and phone before socials
export const CONTACT_LINKS = [
    {
        label: SITE.email,
        href: `mailto:${SITE.email}`,
        icon: EnvelopeIcon,
    },
    ...(phone?.href
        ? [
              {
                  label: phone.label,
                  href: phone.href,
                  icon: PhoneIcon,
              },
          ]
        : []),
    {
        label: "LinkedIn",
        href: SITE.linkedin,
        icon: LinkedinLogoIcon,
    },
    {
        label: "GitHub",
        href: SITE.github,
        icon: GithubLogoIcon,
    },
    {
        label: "Discord",
        href: SITE.discord,
        icon: DiscordLogoIcon,
    },
];
