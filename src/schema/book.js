import { z } from 'zod'

export const bookSchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 characters long')
        .refine((val) => val.trim() !== '', 'Title is required'),
    author: z
        .string()
        .min(3, 'Author must be at least 3 characters long')
        .refine((val) => val.trim() !== '', 'Author is required'),
    genre: z
        .string()
        .min(3, 'Genre must be at least 3 characters long')
        .refine((val) => val.trim() !== '', 'Genre is required'),
    image: z.any().refine((file) => file?.length === 1, 'Image is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters long')
        .refine((val) => val.trim() !== '', 'Description is required'),
    book_link: z
        .string()
        .url('Book link must be a valid URL')
        .refine((val) => val.trim() !== '', 'Book link is required'),
    category: z
        .string()
        .min(1, 'Category is required')
        .refine((val) => val.trim() !== '', 'Category is required'),
    department: z
        .string()
        .min(1, 'Department is required')
        .refine((val) => val.trim() !== '', 'Department is required'),
})
