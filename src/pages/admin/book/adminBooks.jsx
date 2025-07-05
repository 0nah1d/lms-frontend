import React, {useEffect, useState} from 'react'

import {toast} from 'react-toastify'
import {api} from "../../../utils/api.js";
import {getDepartmentList} from "../../../utils/queary.js";
import BookFormModal from "./elements/bookFormModal.jsx";
import ConfirmDialog from "../../../components/UI/confirmDialog.jsx";

export default function AdminBooks() {
    const [books, setBooks] = useState([])
    const [departments, setDepartments] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)

    const fetchBooks = async () => {
        const res = await api.get('/book')
        setBooks(res.data || [])
    }

    useEffect(() => {
        getDepartmentList().then(setDepartments)
        void fetchBooks()
    }, [])

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
            await fetchBooks()
        } catch {
            toast.error('Failed to delete')
        } finally {
            setConfirmOpen(false)
        }
    }

    const handleSubmitBook = async (payload) => {
        if (selectedBook) {
            const res = await api.patch(`/book/${selectedBook._id}`, payload)
            toast.success(res.data.message)
        } else {
            const res = await api.post('/book', payload)
            toast.success(res.data.message)
        }
        await fetchBooks()
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Books</h1>
                <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded">
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
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books?.results?.map((book, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">
                            <div className={'flex items-center gap-4'}>
                                <img height={60} width={60} src={book.image} alt={'book'}/>
                                {book.title}
                            </div>
                        </td>
                        <td className="border px-4 py-2">{book.author}</td>
                        <td className="border px-4 py-2">{book.genre}</td>
                        <td className="border px-4 py-2">
                            {book.department.name}
                        </td>
                        <td className="border px-4 py-2">
                            {book.stock}
                        </td>
                        <td className="border px-4 py-2 space-x-2">
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <BookFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={selectedBook}
                onSubmitBook={handleSubmitBook}
                departmentList={departments}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this book?"
            />
        </div>
    )
}
