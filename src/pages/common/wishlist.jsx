import React, { useCallback, useEffect, useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteConfirmDialog from '../../components/UI/deleteConfirmDialog.jsx'
import Pagination from '../../components/UI/pagination.jsx'
import { useToken } from '../../context/tokenContext.jsx'
import { api } from '../../utils/api.js'
import { handleApiError } from '../../utils/handleError.js'

const Wishlist = () => {
    const { token } = useToken()
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)

    const fetchWishlist = useCallback(
        async (currentPage = 1) => {
            if (!token?.accessToken) return
            setLoading(true)
            try {
                const { data } = await api.get(`/wishlist?page=${currentPage}`)
                setWishlist(data?.results || [])
                setPage(data?.page || 1)
                setTotalPages(data?.total_page || 1)
            } catch (error) {
                handleApiError(error)
            } finally {
                setLoading(false)
            }
        },
        [token]
    )

    useEffect(() => {
        if (token?.accessToken) {
            fetchWishlist(page)
        }
    }, [page, token])

    const handleRemove = async (bookId) => {
        try {
            const res = await api.delete(`/wishlist/${bookId}`)
            toast.success(res.message || 'Book removed from wishlist')
            fetchWishlist(1)
            setIsDeleteDialogOpen(false)
        } catch (error) {
            handleApiError(error)
        }
    }

    if (!token?.accessToken || loading) {
        return (
            <div className="text-center py-10 min-h-[90vh] flex items-center justify-center">
                Loading wishlist...
            </div>
        )
    }

    if (!wishlist.length) {
        return (
            <div className="text-center py-10 min-h-[90vh] flex items-center justify-center">
                Your wishlist is empty.
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {wishlist.map((item) => {
                    const book = item.book
                    return (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md border p-4 flex flex-col justify-between"
                        >
                            <img
                                src={book.image_url}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {book.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    By {book.author}
                                </p>
                                <p className="text-sm text-gray-700 line-clamp-3 mt-1">
                                    {book.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <Link
                                    to={`/book/${book._id}`}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsDeleteDialogOpen(true)
                                        setSelectedBookId(book._id)
                                    }}
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                    title="Remove from wishlist"
                                >
                                    <LuTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={() => handleRemove(selectedBookId)}
                message="Are you sure you want to delete this book from your wishlist?"
            />
        </div>
    )
}

export default Wishlist
