import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { objectToArray } from '../../../../utils/index.js'
import { departmentSchema } from '../../../../schema/department.js'

export default function DepartmentFormModal({
    isOpen,
    onClose,
    initialData,
    onSubmitDept,
}) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(departmentSchema),
    })

    useEffect(() => {
        if (initialData) {
            reset({ ...initialData })
        } else {
            reset({
                name: '',
                description: '',
            })
        }
    }, [initialData, reset])

    const handleFormSubmit = async (data) => {
        try {
            await onSubmitDept(data)
            reset({
                name: '',
                description: '',
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
                    {initialData ? 'Edit Department' : 'Add Department'}
                </h2>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Name*</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Description
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
                            {initialData
                                ? 'Update Department'
                                : 'Add Department'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
