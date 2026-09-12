import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import { Card, CardContent } from "#/components/shadcn/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { Textarea } from "#/components/shadcn/textarea";
import { useContactForm } from "#/hooks/useContactForm";
import { m } from "#/paraglide/messages";

export const MessageForm = () => {
    const { status, fieldErrors, handleSubmit } = useContactForm();

    return (
        <Card className="w-full max-w-md bg-glass py-0 pointer-events-auto sm:max-w-full lg:flex-2">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <CardContent className="p-6 sm:p-8">
                    <FieldGroup className="gap-6">
                        {/* honeypot field */}
                        <div
                            aria-hidden="true"
                            className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
                        >
                            <label htmlFor="contact-company">Company</label>
                            <input
                                id="contact-company"
                                name="company"
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                            <div className="flex flex-col gap-5 sm:w-56 sm:shrink-0">
                                <Field data-invalid={Boolean(fieldErrors.name)}>
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
                                        aria-invalid={Boolean(fieldErrors.name)}
                                    />
                                    {fieldErrors.name && (
                                        <FieldError className="text-xs text-destructive">
                                            {fieldErrors.name}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field
                                    data-invalid={Boolean(fieldErrors.email)}
                                >
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
                                        aria-invalid={Boolean(
                                            fieldErrors.email
                                        )}
                                    />
                                    {fieldErrors.email && (
                                        <FieldError className="text-xs text-destructive">
                                            {fieldErrors.email}
                                        </FieldError>
                                    )}
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
                            <Field
                                className="sm:flex-1"
                                data-invalid={Boolean(fieldErrors.message)}
                            >
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
                                    aria-invalid={Boolean(fieldErrors.message)}
                                    className="flex-1 resize-none"
                                />
                                {fieldErrors.message && (
                                    <FieldError className="text-xs text-destructive">
                                        {fieldErrors.message}
                                    </FieldError>
                                )}
                            </Field>
                        </div>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={status === "pending"}
                        >
                            <span>{m.contact_form_submit()}</span>
                            <ArrowRightIcon data-icon="inline-end" />
                        </Button>
                        {status === "success" && (
                            <p className="text-sm text-muted-foreground">
                                {m.contact_form_submit_success()}
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-sm text-destructive">
                                {m.contact_form_submit_error()}
                            </p>
                        )}
                    </FieldGroup>
                </CardContent>
            </form>
        </Card>
    );
};
