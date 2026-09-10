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
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
