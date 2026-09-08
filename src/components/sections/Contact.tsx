import { ArrowRightIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { Button } from "#/components/shadcn/button";
import { Field, FieldGroup, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { Textarea } from "#/components/shadcn/textarea";

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
	event.preventDefault();
	// TODO: wire this up to an endpoint that emails the submission
};

export const Contact = () => {
	return (
		<SectionContainer sectionName="contact">
			<div className="flex flex-col gap-8">
				<SectionHeading text="Ta kontakt!" kicker="// contact" />
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md border border-border bg-card/40 p-6 pointer-events-auto sm:p-8"
				>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="contact-name">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Navn
							</FieldLabel>
							<Input id="contact-name" name="name" required />
						</Field>
						<Field>
							<FieldLabel htmlFor="contact-email">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Epost
							</FieldLabel>
							<Input id="contact-email" name="email" type="email" required />
						</Field>
						<Field>
							<FieldLabel htmlFor="contact-message">
								<span aria-hidden className="text-muted-foreground">
									{">"}
								</span>
								Melding
							</FieldLabel>
							<Textarea id="contact-message" name="message" rows={5} required />
						</Field>
						<Button type="submit" className="w-full">
							<span>Send</span>
							<ArrowRightIcon />
						</Button>
					</FieldGroup>
				</form>
			</div>
		</SectionContainer>
	);
};
