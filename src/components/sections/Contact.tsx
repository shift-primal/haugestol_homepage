import { SectionContainer } from "#/components/layout/SectionContainer";
import { Button } from "#/components/shadcn/button";
import { Field, FieldGroup, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { KineticText } from "#/components/shadcn/kinetic-text";
import { Textarea } from "#/components/shadcn/textarea";

const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
	event.preventDefault();
	// TODO: wire this up to an endpoint that emails the submission
};

export const Contact = () => {
	return (
		<SectionContainer sectionName="contact">
			<div className="flex flex-col gap-6">
				<KineticText
					as="h2"
					text="Contact"
					className="text-3xl sm:text-4xl lg:text-5xl"
				/>
				<form onSubmit={handleSubmit} className="max-w-md pointer-events-auto">
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="contact-name">Name</FieldLabel>
							<Input id="contact-name" name="name" required />
						</Field>
						<Field>
							<FieldLabel htmlFor="contact-email">Email</FieldLabel>
							<Input id="contact-email" name="email" type="email" required />
						</Field>
						<Field>
							<FieldLabel htmlFor="contact-message">Message</FieldLabel>
							<Textarea id="contact-message" name="message" rows={5} required />
						</Field>
						<Button type="submit">Send</Button>
					</FieldGroup>
				</form>
			</div>
		</SectionContainer>
	);
};
