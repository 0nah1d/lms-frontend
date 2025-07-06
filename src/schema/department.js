import { z } from 'zod'

export const departmentSchema = z.object({
    name: z
        .string()
        .min(2, 'Department name must be at least 2 characters long')
        .nonempty('Department name is required'),
    description: z.string().optional(),
})
