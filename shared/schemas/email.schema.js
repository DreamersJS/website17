import z from "zod"

export const contactSchema = z.object({
    name: z.string().trim(),
    email: z.string().email("Invalid email"),
    phone: z.string().trim(),
    message: z.string().trim()
})

export const singleEmailSchema = z.object({
    email: z.string().email("Invalid email"),
})
