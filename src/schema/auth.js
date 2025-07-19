import { z } from 'zod'

export const registrationSchema = z
    .object({
        username: z
            .string()
            .min(1, 'Name is required')
            .max(50, 'Name must be under 50 characters'),

        email: z
            .string()
            .min(1, 'Email is required')
            .email('Invalid email address'),

        password: z.string().min(8, 'Password must be at least 8 characters'),

        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
    })

export const loginSchema = z.object({
    username_or_email: z
        .string()
        .min(1, 'Email or Username is required')
        .refine(
            (value) => {
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                const isUsername = /^[a-zA-Z0-9_]{3,50}$/.test(value)
                return isEmail || isUsername
            },
            {
                message: 'Enter a valid email or username',
            }
        ),

    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
})
