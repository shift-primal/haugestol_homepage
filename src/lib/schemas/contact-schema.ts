import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().trim().min(2),
    email: z.email(),
    phone: z
        .string()
        .trim()
        .optional()
        .transform((value) => value || undefined),
    message: z.string().trim().min(10),
    // honeypot — must stay empty; bots that fill every field trip it
    company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
