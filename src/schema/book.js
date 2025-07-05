import { z } from 'zod'

export const bookSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(5, 'Title must be at least 5 characters long'),
    author: z
        .string()
        .min(1, 'Author is required')
        .min(3, 'Author must be at least 3 characters long'),
    genre: z
        .string()
        .min(1, 'Genre is required')
        .min(3, 'Genre must be at least 3 characters long'),
    image: z.any().refine((file) => file?.length === 1, 'Image is required'),
    description: z
        .string()
        .min(1, 'Description is required')
        .min(10, 'Description must be at least 10 characters long'),
    book_link: z
        .string()
        .min(1, 'Book link is required')
        .url('Book link must be a valid URL'),
    department: z.string().min(1, 'Department is required'),
})
