import { ArrowRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "#/components/shadcn/button";
import { Field, FieldGroup, FieldLabel } from "#/components/shadcn/field";
import { Input } from "#/components/shadcn/input";
import { Textarea } from "#/components/shadcn/textarea";
import { contactFormSchema } from "#/lib/schemas/contact-schema";
import { m } from "#/paraglide/messages";
import { sendContactMessage } from "#/server/sendContactMessage";

type Status = "idle" | "pending" | "success" | "error";

const fieldErrorMessages = {
    name: m.contact_form_name_error,
    email: m.contact_form_email_error,
    message: m.contact_form_message_error,
} as const;

type FieldErrors = Partial<Record<keyof typeof fieldErrorMessages, string>>;

export const MessageForm = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form));
        const result = contactFormSchema.safeParse(values);

        if (!result.success) {
            const errors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0];
                if (typeof field === "string" && field in fieldErrorMessages) {
                    errors[field as keyof FieldErrors] =
                        fieldErrorMessages[
                            field as keyof typeof fieldErrorMessages
                        ]();
                }
            }
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        setStatus("pending");
        try {
            await sendContactMessage({
                data: result.data,
            });
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
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
                                aria-invalid={Boolean(fieldErrors.name)}
                            />
                            {fieldErrors.name && (
                                <p className="text-xs text-destructive">
                                    {fieldErrors.name}
                                </p>
                            )}
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
                                aria-invalid={Boolean(fieldErrors.email)}
                            />
                            {fieldErrors.email && (
                                <p className="text-xs text-destructive">
                                    {fieldErrors.email}
                                </p>
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
                            aria-invalid={Boolean(fieldErrors.message)}
                            className="flex-1 resize-none"
                        />
                        {fieldErrors.message && (
                            <p className="text-xs text-destructive">
                                {fieldErrors.message}
                            </p>
                        )}
                    </Field>
                </div>
                <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={status === "pending"}
                >
                    <span>{m.contact_form_submit()}</span>
                    <ArrowRightIcon />
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
        </form>
    );
};
