import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useToken } from '../../context/tokenContext.jsx'
import { issueFormSchema } from '../../schema/issue.js'
import { api } from '../../utils/api.js'
import { objectToArray } from '../../utils/index.js'
import Comments from './comments.jsx'

export default function BookDetails() {
    const book = useLoaderData()
    const navigate = useNavigate()
    const { token, logout } = useToken()

    const {
        _id,
        title,
        author,
        genre,
        description,
        stock,
        image_url,
        book_link,
    } = book

    const [existingIssueStatus, setExistingIssueStatus] = useState(null) // null | "pending" | "approved"
    const [checking, setChecking] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm({
        resolver: zodResolver(issueFormSchema),
        defaultValues: {
            quantity: 1,
            return_date: '',
        },
    })

    useEffect(() => {
        const checkIssued = async () => {
            if (!token) {
                setChecking(false)
                return
            }

            try {
                const res = await api.get(`/issue/book/${_id}/check`)
                if (res.data.alreadyIssued) {
                    setExistingIssueStatus(res.data.status || 'pending') // fallback to pending if no status
                } else {
                    setExistingIssueStatus(null)
                }
            } catch (err) {
                toast.error(
                    err.response?.data?.message ||
                        'Failed to check issue status'
                )
            } finally {
                setChecking(false)
            }
        }

        void checkIssued()
    }, [_id, token, logout])

    const handleOpenModal = () => {
        if (!token) {
            navigate('/login')
            return
        }
        setIsModalOpen(true)
    }

    const onSubmit = async (data) => {
        try {
            const res = await api.post('/issue', {
                book: _id,
                quantity: data.quantity,
                return_date: data.return_date || null,
            })
            toast.success(res.data.message)
            setExistingIssueStatus('pending') // After request, status is pending
            setIsModalOpen(false)
            reset()
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

    return (
        <>
            <div className="card card-side bg-base-100 shadow-sm my-10 max-w-4xl mx-auto">
                <figure className="w-full md:w-1/3">
                    <img className="w-full" src={image_url} alt={title} />
                </figure>
                <div className="card-body w-full md:w-2/3">
                    <h2 className="card-title">{title}</h2>
                    <p>
                        <strong>Author:</strong> {author}
                    </p>
                    <p>
                        <strong>Genre:</strong> {genre}
                    </p>
                    <p>
                        <strong>Available Stock:</strong> {stock}
                    </p>
                    <p className="mt-2">{description}</p>

                    <div className="card-actions gap-5 mt-4">
                        {checking ? (
                            <button className="btn btn-disabled">
                                Checking...
                            </button>
                        ) : stock === 0 ? (
                            <button className="btn btn-disabled">
                                Not Available
                            </button>
                        ) : existingIssueStatus === 'approved' ? (
                            <button className="btn btn-success btn-disabled">
                                Approved
                            </button>
                        ) : existingIssueStatus ? (
                            <button className="btn btn-info btn-disabled">
                                Request Sent
                            </button>
                        ) : (
                            <button
                                onClick={handleOpenModal}
                                className="btn btn-success text-white"
                            >
                                Add to Borrow
                            </button>
                        )}

                        {book_link && (
                            <a
                                href={book_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success text-white"
                            >
                                Download
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <Comments bookId={_id} />
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white text-black p-6 rounded-lg max-w-sm w-full shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-4">
                            Confirm Borrow
                        </h3>

                        <div className="mb-4">
                            <label
                                htmlFor="quantity"
                                className="block font-semibold mb-1"
                            >
                                Select quantity to borrow (max: {stock})
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                className="w-full border rounded px-3 py-2"
                                min={1}
                                max={stock}
                                {...register('quantity', {
                                    valueAsNumber: true,
                                    max: stock,
                                    min: 1,
                                })}
                            />
                            {errors.quantity && (
                                <p className="text-error text-sm mb-2">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="return_date"
                                className="block font-semibold mb-1"
                            >
                                Select Return Date
                            </label>
                            <input
                                type="date"
                                id="return_date"
                                className="w-full border rounded px-3 py-2"
                                {...register('return_date')}
                                min={new Date().toISOString().split('T')[0]}
                                style={{
                                    WebkitAppearance: 'textfield',
                                    color: 'black',
                                    filter: 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%)',
                                }}
                            />
                            {errors.return_date && (
                                <p className="text-error text-sm mb-2">
                                    {errors.return_date.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false)
                                    reset()
                                }}
                                className="btn"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
