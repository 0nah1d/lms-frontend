import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { bookSchema } from '../../schema/book'
import { imageToBase64, objectToArray } from '../../utils'
import { api } from '../../utils/api'
import { getCategoryList, getDepartmentList } from '../../utils/queary'

export default function AddBooks() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: zodResolver(bookSchema),
    })

    const [categoryList, setCategoryList] = useState([])
    const [departmentList, setDepartmentList] = useState([])

    useEffect(() => {
        getCategoryList().then((res) => {
            setCategoryList(res)
        })
    }, [])

    useEffect(() => {
        getDepartmentList().then((res) => {
            setDepartmentList(res)
        })
    }, [])

    const onSubmit = async (data) => {
        try {
            const base64Image = await imageToBase64(data.image[0])

            const payload = {
                ...data,
                image: base64Image,
            }

            const res = await api.post('/book', payload)

            toast.success(res?.data?.message)
            reset()
        } catch (error) {
            if (error.response?.data) {
                const formattedData = objectToArray(error.response.data)
                formattedData.forEach((el) => {
                    setError(el.name, {
                        type: 'custom',
                        message: el.message,
                    })
                })
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow mt-10 text-black">
            <h2 className="text-2xl font-semibold mb-6">Add a New Book</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >
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
                        <label className="block mb-1 font-medium">Genre*</label>
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
                            Category*
                        </label>
                        <select
                            {...register('category')}
                            className="w-full border rounded px-3 py-2"
                            defaultValue=""
                        >
                            <option value="">Select Category</option>
                            {categoryList.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 font-medium">
                            Department*
                        </label>
                        <select
                            {...register('department')}
                            className="w-full border rounded px-3 py-2"
                            defaultValue=""
                        >
                            <option value="">Select Department</option>{' '}
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
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Book Link*</label>
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
                </div>

                <div className="mb-6">
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

                <button
                    type="submit"
                    className="bg-yellow-800 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded"
                >
                    Add Book
                </button>
            </form>
        </div>
    )
}
