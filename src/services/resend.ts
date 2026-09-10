import { Resend } from "resend";

const apiKey: string | undefined = process.env.RESEND_API_KEY;

if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY in .env");
}

export const resend = new Resend(apiKey);
