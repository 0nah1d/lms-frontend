import {z} from 'zod'

export const getBookSchema = (isEdit = false) =>
    z.object({
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
        description: z
            .string()
            .min(1, 'Description is required')
            .min(10, 'Description must be at least 10 characters long'),
        book_link: z
            .string()
            .min(1, 'Book link is required')
            .url('Book link must be a valid URL'),
        department: z.string().min(1, 'Department is required'),
        stock: z
            .coerce.number({
                invalid_type_error: 'Stock must be a number',
                required_error: 'Stock is required',
            })
            .min(0, 'Stock must be 0 or greater'),
        image: isEdit
            ? z.any().optional()
            : z
                .any()
                .refine(
                    (file) => file instanceof FileList && file.length === 1,
                    'Image is required'
                ),
    })
