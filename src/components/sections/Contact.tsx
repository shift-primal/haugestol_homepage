import {
	ArrowRightIcon,
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

const CONTACT_LINKS = [
	{ label: "GitHub", href: SITE.github, icon: GithubLogoIcon },
	{ label: "LinkedIn", href: SITE.linkedin, icon: LinkedinLogoIcon },
	{ label: SITE.email, href: `mailto:${SITE.email}`, icon: EnvelopeIcon },
];

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
	event.preventDefault();
	// TODO: wire this up to an endpoint that emails the submission
};

export const Contact = () => {
	return (
		<SectionContainer sectionName="contact">
			<SectionHeading text="Ta kontakt!" kicker="// contact" />
			<div className="flex flex-col gap-8 items-center sm:items-stretch mt-10">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md border border-border bg-card/40 p-6 pointer-events-auto sm:max-w-2xl sm:p-8"
				>
					<FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-x-6">
						<Field className="sm:col-start-1 sm:row-start-1">
							<FieldLabel htmlFor="contact-name">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Navn
							</FieldLabel>
							<Input id="contact-name" name="name" required />
						</Field>
						<Field className="sm:col-start-1 sm:row-start-2">
							<FieldLabel htmlFor="contact-email">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Epost
							</FieldLabel>
							<Input id="contact-email" name="email" type="email" required />
						</Field>
						<Field className="sm:col-start-1 sm:row-start-3">
							<FieldLabel htmlFor="contact-phone">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Telefon{" "}
								<span className="text-muted-foreground font-light">
									valgfritt
								</span>
							</FieldLabel>
							<Input id="contact-phone" name="phone" type="phone" />
						</Field>
						<Field className="sm:col-start-2 sm:row-start-1 sm:row-span-3 sm:h-full">
							<FieldLabel htmlFor="contact-message">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Melding
							</FieldLabel>
							<Textarea
								id="contact-message"
								name="message"
								rows={8}
								required
								className="grow"
							/>
						</Field>
						<Button
							type="submit"
							className="w-full sm:col-span-2 sm:w-auto sm:justify-self-center sm:px-16"
						>
							<span>Send</span>
							<ArrowRightIcon />
						</Button>
					</FieldGroup>
				</form>

				<div className="flex w-full max-w-md items-center gap-4 pointer-events-auto sm:max-w-2xl">
					<span className="h-px flex-1 bg-border" />
					<span className="font-mono text-xs tracking-widest text-muted-foreground">
						eller
					</span>
					<span className="h-px flex-1 bg-border" />
				</div>

				<div className="flex w-full max-w-md flex-col gap-2 pointer-events-auto sm:max-w-2xl">
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
			</div>
		</SectionContainer>
	);
};
