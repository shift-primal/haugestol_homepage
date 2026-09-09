import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import { Field, FieldGroup, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { Textarea } from "#/components/shadcn/textarea";
import { m } from "#/paraglide/messages";

export const MessageForm = () => {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: wire this up to an endpoint that emails the submission
    };

    return (
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
    );
};
