import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getBookSchema } from '../../../../schema/book.js'
import { imageToBase64, objectToArray } from '../../../../utils/index.js'

export default function BookFormModal({
    isOpen,
    onClose,
    initialData,
    onSubmitBook,
    departmentList,
}) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(getBookSchema(!!initialData)),
    })

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                image: '',
                department: initialData.department._id,
            })
        } else {
            reset({
                title: '',
                author: '',
                genre: '',
                image: '',
                description: '',
                book_link: '',
                department: '',
                stock: 0,
            })
        }
    }, [initialData, reset])

    const handleFormSubmit = async (data) => {
        try {
            let base64Image = initialData?.image || ''
            if (data.image && data.image[0]?.type) {
                base64Image = await imageToBase64(data.image[0])
            }

            const payload = {
                ...data,
                image: base64Image,
            }

            await onSubmitBook(payload)
            reset({
                title: '',
                author: '',
                genre: '',
                image: '',
                description: '',
                book_link: '',
                department: '',
                stock: 0,
            })
            onClose()
        } catch (error) {
            const formattedData = objectToArray(error?.response?.data || {})
            formattedData.forEach((el) => {
                setError(el.name, {
                    type: 'manual',
                    message: el.message,
                })
            })
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative text-black max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl"
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? 'Edit Book' : 'Add Book'}
                </h2>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Title*</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Author & Genre */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Author*
                            </label>
                            <input
                                type="text"
                                {...register('author')}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.author && (
                                <p className="text-red-500 text-sm">
                                    {errors.author.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Genre*
                            </label>
                            <input
                                type="text"
                                {...register('genre')}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.genre && (
                                <p className="text-red-500 text-sm">
                                    {errors.genre.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Department*
                            </label>
                            <select
                                {...register('department')}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Department</option>
                                {departmentList.map((dept) => (
                                    <option key={dept._id} value={dept._id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.department && (
                                <p className="text-red-500 text-sm">
                                    {errors.department.message}
                                </p>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="block mb-1 font-medium">
                                Stock*
                            </label>
                            <input
                                type="number"
                                {...register('stock')}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm">
                                    {errors.stock.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Book Link */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Book Link*
                        </label>
                        <input
                            type="url"
                            {...register('book_link')}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.book_link && (
                            <p className="text-red-500 text-sm">
                                {errors.book_link.message}
                            </p>
                        )}
                    </div>

                    {/* Upload Image */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Upload Image*
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image.message}
                            </p>
                        )}
                        {initialData?.image && (
                            <img
                                src={initialData.image}
                                alt="Current"
                                className="mt-2 h-24 object-contain border rounded"
                            />
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Description*
                        </label>
                        <textarea
                            {...register('description')}
                            className="w-full border rounded px-3 py-2"
                            rows={4}
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-right">
                        <button
                            type="submit"
                            className="bg-yellow-700 text-white px-6 py-2 rounded"
                        >
                            {initialData ? 'Update Book' : 'Add Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
