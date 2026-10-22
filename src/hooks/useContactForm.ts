import type { FocusEvent, FormEvent, SubmitEvent } from "react";
import { useState } from "react";
import { contactFormSchema } from "#/lib/schemas/contact-schema";
import { m } from "#/paraglide/messages";
import { sendContactMessage } from "#/server/sendContactMessage";

type Status = "idle" | "pending" | "success" | "error";

const fieldErrorMessages = {
    name: m.contact_form_name_error,
    email: m.contact_form_email_error,
    message: m.contact_form_message_error,
} as const;

type ValidatedField = keyof typeof fieldErrorMessages;
type FieldErrors = Partial<Record<ValidatedField, string>>;

// DOM order, so the first invalid field is the one that gets focus
const VALIDATED_FIELDS = Object.keys(fieldErrorMessages) as ValidatedField[];

const isValidatedField = (name: string): name is ValidatedField =>
    name in fieldErrorMessages;

// form-level blur/change events can come from any element inside the form
const getFieldInput = (target: EventTarget) =>
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
        ? target
        : null;

const validateField = (field: ValidatedField, value: string) =>
    contactFormSchema.shape[field].safeParse(value).success
        ? undefined
        : fieldErrorMessages[field]();

export const useContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const setFieldError = (field: ValidatedField, error?: string) =>
        setFieldErrors((prev) =>
            prev[field] === error
                ? prev
                : {
                      ...prev,
                      [field]: error,
                  }
        );

    // check a field once the visitor leaves it, but don't nag about empty
    // fields they simply tabbed past
    const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
        const input = getFieldInput(event.target);
        if (!input) return;
        const { name, value } = input;
        if (!isValidatedField(name)) return;
        if (value.trim() === "" && !fieldErrors[name]) return;
        setFieldError(name, validateField(name, value));
    };

    // once a field has an error, clear it the moment the input becomes valid
    const handleChange = (event: FormEvent<HTMLFormElement>) => {
        const input = getFieldInput(event.target);
        if (!input) return;
        const { name, value } = input;
        if (!isValidatedField(name) || !fieldErrors[name]) return;
        setFieldError(name, validateField(name, value));
    };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form));
        const result = contactFormSchema.safeParse(values);

        if (!result.success) {
            const errors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0];
                if (typeof field === "string" && isValidatedField(field)) {
                    errors[field] = fieldErrorMessages[field]();
                }
            }
            setFieldErrors(errors);

            const firstInvalid = VALIDATED_FIELDS.find(
                (field) => errors[field]
            );
            if (firstInvalid) {
                (
                    form.elements.namedItem(firstInvalid) as HTMLElement | null
                )?.focus();
            }
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

    return {
        status,
        fieldErrors,
        handleBlur,
        handleChange,
        handleSubmit,
    };
};
