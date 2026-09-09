import {
    ArrowRightIcon,
    DiscordLogoIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { Button } from "#/components/shadcn/button";
import { Field, FieldGroup, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { Textarea } from "#/components/shadcn/textarea";
import { SITE } from "#/lib/content";
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

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire this up to an endpoint that emails the submission
};

export const Contact = () => {
    return (
        <SectionContainer sectionName="contact">
            <SectionHeading
                text={m.contact_heading()}
                kicker="// contact"
            />
            <div className="flex flex-col gap-8 items-center mt-10 lg:flex-row lg:items-stretch">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md border border-border bg-card/40 p-6 pointer-events-auto sm:max-w-full sm:p-8 backdrop-blur-md lg:flex-2"
                >
                    <FieldGroup className="gap-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                            <div className="flex flex-col gap-5 sm:w-56 sm:shrink-0">
                                <Field>
                                    <FieldLabel htmlFor="contact-name">
                                        <span
                                            aria-hidden
                                            className="text-muted-foreground"
                                        >
                                            {">"}
                                        </span>
                                        {m.contact_form_name_label()}
                                    </FieldLabel>
                                    <Input
                                        id="contact-name"
                                        name="name"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="contact-email">
                                        <span
                                            aria-hidden
                                            className="text-muted-foreground"
                                        >
                                            {">"}
                                        </span>
                                        {m.contact_form_email_label()}
                                    </FieldLabel>
                                    <Input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="contact-phone">
                                        <span
                                            aria-hidden
                                            className="text-muted-foreground"
                                        >
                                            {">"}
                                        </span>
                                        {m.contact_form_phone_label()}{" "}
                                        <span className="text-muted-foreground font-light">
                                            {m.contact_form_phone_optional()}
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        id="contact-phone"
                                        name="phone"
                                        type="tel"
                                    />
                                </Field>
                            </div>
                            <Field className="sm:flex-1">
                                <FieldLabel htmlFor="contact-message">
                                    <span
                                        aria-hidden
                                        className="text-muted-foreground"
                                    >
                                        {">"}
                                    </span>
                                    {m.contact_form_message_label()}
                                </FieldLabel>
                                <Textarea
                                    id="contact-message"
                                    name="message"
                                    rows={8}
                                    required
                                    className="flex-1 resize-none"
                                />
                            </Field>
                        </div>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                        >
                            <span>{m.contact_form_submit()}</span>
                            <ArrowRightIcon />
                        </Button>
                    </FieldGroup>
                </form>

                <div className="flex w-full max-w-md items-center gap-4 pointer-events-auto sm:max-w-full lg:w-auto lg:flex-col lg:self-stretch">
                    <span className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                    <span className="font-mono text-xs tracking-widest text-muted-foreground">
                        {m.contact_or_divider()}
                    </span>
                    <span className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                </div>

                <div className="flex w-full max-w-md flex-col gap-2 pointer-events-auto lg:w-auto lg:flex-1 p-6 sm:max-w-full sm:p-8 backdrop-blur-md border border-border">
                    <span className="mb-4">Links</span>
                    {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
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
                            className="group flex w-fit items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <span aria-hidden>{">"}</span>
                            <Icon className="size-4" />
                            <span className="group-hover:underline">
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};
