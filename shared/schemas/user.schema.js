import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "username must be at least 3 chars"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});

export const userSchema = z.object({
    id: z.string(),
    username: z.string().min(3, "username must be at least 3 chars"),
    email: z.string().email("Invalid email"),
    role: z.enum(["USER", "ADMIN"]),
    isBlocked: z.boolean(),
    createdAt: z.string().datetime(),
});

export const authResponseSchema = z.object({
    message: z.string(),
    data: userSchema,
    meta: z.object({
        accessToken: z.string(),
    }),
});