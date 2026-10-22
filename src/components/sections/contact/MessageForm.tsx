import {
    ArrowRightIcon,
    CheckCircleIcon,
    WarningCircleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
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
import { SITE } from "#/content";
import { useContactForm } from "#/hooks/useContactForm";
import {
    CONTACT_PREFILL_EVENT,
    takeContactPrefill,
} from "#/lib/contact-prefill";
import { CONTACT_FIELD_MAX_LENGTH } from "#/lib/schemas/contact-schema";
import { m } from "#/paraglide/messages";

export const MessageForm = () => {
    const { status, fieldErrors, handleBlur, handleChange, handleSubmit } =
        useContactForm();
    const messageRef = useRef<HTMLTextAreaElement>(null);

    // a "Be om demo" button elsewhere may have left a starting message,
    // either before this form mounted or while it's on screen
    useEffect(() => {
        const applyPrefill = () => {
            const message = takeContactPrefill();
            const textarea = messageRef.current;
            if (!message || !textarea) return;
            textarea.value = message;
            textarea.focus({
                preventScroll: true,
            });
            textarea.setSelectionRange(message.length, message.length);
        };
        applyPrefill();
        window.addEventListener(CONTACT_PREFILL_EVENT, applyPrefill);
        return () =>
            window.removeEventListener(CONTACT_PREFILL_EVENT, applyPrefill);
    }, []);

    return (
        <Card className="order-last w-full max-w-md py-0 pointer-events-auto sm:max-w-full lg:order-none lg:flex-2">
            <form
                onSubmit={handleSubmit}
                onBlur={handleBlur}
                onChange={handleChange}
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
                                        autoComplete="name"
                                        required
                                        maxLength={
                                            CONTACT_FIELD_MAX_LENGTH.name
                                        }
                                        aria-invalid={Boolean(fieldErrors.name)}
                                        aria-describedby={
                                            fieldErrors.name
                                                ? "contact-name-error"
                                                : undefined
                                        }
                                    />
                                    {fieldErrors.name && (
                                        <FieldError
                                            id="contact-name-error"
                                            className="text-xs text-destructive"
                                        >
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
                                        autoComplete="email"
                                        required
                                        maxLength={
                                            CONTACT_FIELD_MAX_LENGTH.email
                                        }
                                        aria-invalid={Boolean(
                                            fieldErrors.email
                                        )}
                                        aria-describedby={
                                            fieldErrors.email
                                                ? "contact-email-error"
                                                : undefined
                                        }
                                    />
                                    {fieldErrors.email && (
                                        <FieldError
                                            id="contact-email-error"
                                            className="text-xs text-destructive"
                                        >
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
                                        autoComplete="tel"
                                        maxLength={
                                            CONTACT_FIELD_MAX_LENGTH.phone
                                        }
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
                                    ref={messageRef}
                                    id="contact-message"
                                    name="message"
                                    rows={8}
                                    required
                                    maxLength={CONTACT_FIELD_MAX_LENGTH.message}
                                    aria-invalid={Boolean(fieldErrors.message)}
                                    aria-describedby={
                                        fieldErrors.message
                                            ? "contact-message-error"
                                            : undefined
                                    }
                                    className="min-h-40 flex-1 resize-none"
                                />
                                {fieldErrors.message && (
                                    <FieldError
                                        id="contact-message-error"
                                        className="text-xs text-destructive"
                                    >
                                        {fieldErrors.message}
                                    </FieldError>
                                )}
                            </Field>
                        </div>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto sm:self-end"
                            disabled={status === "pending"}
                        >
                            <span>
                                {status === "pending"
                                    ? m.contact_form_submitting()
                                    : m.contact_form_submit()}
                            </span>
                            <ArrowRightIcon data-icon="inline-end" />
                        </Button>
                        {/* always mounted so screen readers announce the result */}
                        <div
                            role="status"
                            aria-live="polite"
                            className="empty:hidden"
                        >
                            {status === "success" && (
                                <p className="flex items-start gap-3 border border-border bg-muted px-4 py-3 text-sm">
                                    <CheckCircleIcon
                                        aria-hidden
                                        weight="fill"
                                        className="mt-0.5 size-4 shrink-0"
                                    />
                                    {m.contact_form_submit_success()}
                                </p>
                            )}
                            {status === "error" && (
                                <p className="flex items-start gap-3 border border-destructive/50 px-4 py-3 text-sm text-destructive">
                                    <WarningCircleIcon
                                        aria-hidden
                                        weight="fill"
                                        className="mt-0.5 size-4 shrink-0"
                                    />
                                    {m.contact_form_submit_error({
                                        email: SITE.email,
                                    })}
                                </p>
                            )}
                        </div>
                    </FieldGroup>
                </CardContent>
            </form>
        </Card>
    );
};
