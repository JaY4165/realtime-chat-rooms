import z from "zod"

export const signUpSchema = z.object({
    username: z.string().trim().min(3, {
        message: "Username must be at least 3 characters long"
    }),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {
        message: "Password must length must be 8 and above"
    }).max(30, {
        message: "Maximum Password length is 30"
    }).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/,
        {
            message: "Password must contain at least one special character and one number"
        }
    ),
})


export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})

export type SignUpType = z.infer<typeof signUpSchema>

export type SignInType = z.infer<typeof signInSchema>