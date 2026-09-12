import type { SubmitEvent } from "react";
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

type FieldErrors = Partial<Record<keyof typeof fieldErrorMessages, string>>;

export const useContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
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

    return {
        status,
        fieldErrors,
        handleSubmit,
    };
};
