import z from "zod"

export const SignupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    "Password must include uppercase, lowercase, number, and special character")
})