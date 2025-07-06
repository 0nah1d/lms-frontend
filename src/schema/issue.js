import { z } from 'zod'

export const issueFormSchema = z.object({
    quantity: z
        .number({ invalid_type_error: 'Quantity is required' })
        .min(1, 'Quantity must be at least 1'),
    return_date: z
        .string()
        .nonempty('Return date is required')
        .refine(
            (val) => {
                const today = new Date()
                const date = new Date(val)
                date.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)
                return date >= today
            },
            { message: 'Return date cannot be in the past' }
        ),
})
