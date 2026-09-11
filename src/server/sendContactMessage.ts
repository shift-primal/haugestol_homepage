import { createServerFn } from "@tanstack/react-start";
import { contactFormSchema } from "#/lib/schemas/contact-schema";
import { resend } from "#/services/resend";

export const sendContactMessage = createServerFn({
    method: "POST",
})
    .validator(contactFormSchema)
    .handler(async ({ data }) => {
        const { error } = await resend.emails.send({
            from: "contact@portfolio.haugestol.com",
            to: "kasper@haugestol.com",
            replyTo: data.email,
            subject: `New message from ${data.name}`,
            text: [
                `Name: ${data.name}`,
                `Email: ${data.email}`,
                data.phone ? `Phone: ${data.phone}` : undefined,
                "",
                data.message,
            ]
                .filter(Boolean)
                .join("\n"),
        });

        if (error) {
            console.error("[sendContactMessage] Resend error:", error);
            throw new Error(error.message);
        }

        return {
            success: true,
        };
    });
