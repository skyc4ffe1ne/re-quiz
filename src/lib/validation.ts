import { z } from "zod";

export const signUpSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username Required")
        .regex(/^[A-Za-z0-9\-_]+$/, "Only alphanumeric - and  _ allowed"),
    password: z
        .string()
        .trim()
        .min(1, "Password Required")
        .min(8, "Minimun 8 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email Required")
        .email("Please provide a right email"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    username: z.string().trim().min(1, "Username Required"),
    password: z.string().trim().min(1, "Password Required"),
});

export type loginValues = z.infer<typeof loginSchema>;
