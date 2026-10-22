import { z } from "zod";

// also applied as the inputs' maxLength in MessageForm
export const CONTACT_FIELD_MAX_LENGTH = {
    name: 100,
    email: 254,
    phone: 30,
    message: 5000,
} as const;

export const contactFormSchema = z.object({
    name: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH.name),
    email: z.email().max(CONTACT_FIELD_MAX_LENGTH.email),
    phone: z
        .string()
        .trim()
        .max(CONTACT_FIELD_MAX_LENGTH.phone)
        .optional()
        .transform((value) => value || undefined),
    message: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH.message),
    // honeypot — must stay empty; bots that fill every field trip it
    company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
