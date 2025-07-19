import { formatDistanceToNow } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuCircleUserRound, LuTrash2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import DeleteConfirmDialog from '../../components/UI/deleteConfirmDialog.jsx'
import Pagination from '../../components/UI/pagination.jsx'
import { useToken } from '../../context/tokenContext.jsx'
import { api } from '../../utils/api.js'
import { handleApiError } from '../../utils/handleError.js'

const Comments = ({ bookId }) => {
    const navigate = useNavigate()
    const { token } = useToken()

    const [state, setState] = useState({
        comments: [],
        loading: false,
        page: 1,
        totalPages: 1,
    })

    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        commentId: null,
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const fetchComments = useCallback(
        async (pageNumber = 1) => {
            try {
                setState((prev) => ({ ...prev, loading: true }))
                const res = await api.get(
                    `/comment/${bookId}?page=${pageNumber}`
                )
                setState({
                    comments: res.data?.results ?? [],
                    page: res.data?.page ?? 1,
                    totalPages: res.data?.total_page ?? 1,
                    loading: false,
                })
            } catch (error) {
                setState((prev) => ({ ...prev, loading: false }))
                handleApiError(error)
            }
        },
        [bookId]
    )

    useEffect(() => {
        if (bookId) fetchComments(state.page)
    }, [bookId, state.page, fetchComments])

    const onSubmit = async (data) => {
        if (!token) return navigate('/login')

        try {
            const res = await api.post(`/comment/${bookId}`, data)
            reset()
            fetchComments(state.page)
            toast.success(res.message || 'Comment added successfully')
        } catch (error) {
            handleApiError(error)
        }
    }

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/comment/${deleteDialog.commentId}`)
            fetchComments(state.page)
            toast.success(res.message || 'Comment deleted successfully')
        } catch (error) {
            handleApiError(error)
        } finally {
            setDeleteDialog({ open: false, commentId: null })
        }
    }

    const handlePageChange = (newPage) => {
        setState((prev) => ({ ...prev, page: newPage }))
    }

    const openDeleteDialog = (id) => {
        setDeleteDialog({ open: true, commentId: id })
    }

    const closeDeleteDialog = () => {
        setDeleteDialog({ open: false, commentId: null })
    }

    return (
        <div className="my-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
                Comments
            </h1>

            <div className="space-y-6 mb-6">
                {state.loading ? (
                    <p className="text-gray-500 text-center">
                        Loading comments...
                    </p>
                ) : state.comments.length > 0 ? (
                    state.comments.map((c) => (
                        <div
                            key={c._id}
                            className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm flex gap-1"
                        >
                            <LuCircleUserRound size={24} />
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium text-gray-800">
                                        {c.user?.username ?? 'Anonymous'}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDistanceToNow(
                                            new Date(c.createdAt),
                                            {
                                                addSuffix: true,
                                            }
                                        )}
                                    </span>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {c.text}
                                </p>

                                {token?.id === c.user?._id && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() =>
                                                openDeleteDialog(c._id)
                                            }
                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                            aria-label="Delete comment"
                                        >
                                            <LuTrash2 size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mb-10">
                        No comments found
                    </div>
                )}
            </div>

            {!state.loading && state.totalPages > 1 && (
                <Pagination
                    page={state.page}
                    totalPages={state.totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mt-10"
            >
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                    Leave a Comment
                </h2>
                <textarea
                    {...register('text', {
                        required: 'Comment is required',
                        minLength: {
                            value: 5,
                            message: 'Minimum 5 characters',
                        },
                        maxLength: {
                            value: 1000,
                            message: 'Maximum 1000 characters',
                        },
                    })}
                    className={`w-full p-4 h-32 border rounded-xl resize-none focus:outline-none focus:ring-2 ${
                        errors.text
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    placeholder="Write your comment here..."
                />
                {errors.text && (
                    <p className="text-red-500 mt-1 text-sm">
                        {errors.text.message}
                    </p>
                )}
                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                    >
                        Comment
                    </button>
                </div>
            </form>

            <DeleteConfirmDialog
                isOpen={deleteDialog.open}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this comment?"
            />
        </div>
    )
}

export default Comments
