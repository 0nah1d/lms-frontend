import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../utils/api.js'
import { useNavigate } from 'react-router-dom'

import BookFormModal from './elements/bookFormModal.jsx'
import DeleteConfirmDialog from '../../../components/UI/deleteConfirmDialog.jsx'
import Pagination from '../../../components/UI/Pagination.jsx'

import { getBooks, getDepartments } from '../../../utils/queary.js'

export default function AdminBooks() {
    const [books, setBooks] = useState([])
    const [departments, setDepartments] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        void getDepartments()
            .then((res) => {
                setDepartments(res)
                if (res?.length === 0) {
                    toast.warning(
                        'No departments found. Please create department at least one. Then can visit books page.'
                    )
                    navigate('/dashboard/department')
                }
            })
            .catch(() => toast.error('Failed to fetch departments'))
    }, [])

    useEffect(() => {
        void getBooks({ page })
            .then((res) => {
                setBooks(res)
                setTotalPages(res?.total_page || 1)
            })
            .catch(() => toast.error('Failed to fetch books'))
    }, [page])

    const handleAddClick = () => {
        setSelectedBook(null)
        setModalOpen(true)
    }

    const handleEdit = (book) => {
        setSelectedBook(book)
        setModalOpen(true)
    }

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/book/${bookToDelete._id}`)
            toast.success(res.data.message)
            await getBooks({ page }).then((res) => setBooks(res))
        } catch {
            toast.error('Failed to delete')
        } finally {
            setConfirmOpen(false)
        }
    }

    const handleSubmitBook = async (payload) => {
        try {
            if (selectedBook) {
                const res = await api.patch(
                    `/book/${selectedBook._id}`,
                    payload
                )
                toast.success(res.data.message)
            } else {
                const res = await api.post('/book', payload)
                toast.success(res.data.message)
            }
            await getBooks({ page }).then((res) => setBooks(res))
        } catch {
            toast.error('Failed to save book')
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Books</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Book
                </button>
            </div>

            <table className="w-full table-auto border border-gray-300 text-black bg-white shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Author</th>
                        <th className="border px-4 py-2">Genre</th>
                        <th className="border px-4 py-2">Department</th>
                        <th className="border px-4 py-2">Stock</th>
                        <th className="border px-4 py-2 w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.results?.length > 0 ? (
                        books.results.map((book, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center gap-4">
                                        <img
                                            height={60}
                                            width={60}
                                            src={book.image_url}
                                            alt="book"
                                        />
                                        {book.title}
                                    </div>
                                </td>
                                <td className="border px-4 py-2">
                                    {book.author}
                                </td>
                                <td className="border px-4 py-2">
                                    {book.genre}
                                </td>
                                <td className="border px-4 py-2">
                                    {book?.department?.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {book.stock}
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center gap-4 justify-center">
                                        <button
                                            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
                                            onClick={() => handleEdit(book)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-sm px-3 py-1 bg-red-600 text-white rounded"
                                            onClick={() => {
                                                setBookToDelete(book)
                                                setConfirmOpen(true)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-6 text-gray-500"
                            >
                                No books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <BookFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={selectedBook}
                onSubmitBook={handleSubmitBook}
                departmentList={departments}
            />

            <DeleteConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this book?"
            />
        </div>
    )
}
