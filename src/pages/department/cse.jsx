import React, { useEffect, useState } from 'react'
import BooksCard from '../../components/UI/booksCard.jsx'
import CategoryPageTitle from '../../components/UI/categoryPageTitle.jsx'
import Search from '../../components/UI/search.jsx'
import Pagination from '../../components/UI/Pagination.jsx'
import { getBooks } from '../../utils/queary.js'
import useDebounce from '../../hooks/useDebounce.js'

export default function Cse() {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const debouncedSearch = useDebounce(search, 300)

    useEffect(() => {
        setLoading(true)

        getBooks({ page, department: 'CSE', search: debouncedSearch })
            .then((res) => {
                setBooks(res?.results || [])
                setTotalPages(res?.total_page || 1)
            })
            .catch(() => {
                setBooks([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [page, debouncedSearch])

    return (
        <div>
            <CategoryPageTitle
                title="Computer Science and Engineering (CSE)"
                subtitle="Dive into algorithms, software engineering, AI, and everything shaping the digital future."
            />

            <Search search={search} setSearch={setSearch} />

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {loading ? (
                    <span className="loading loading-bars loading-xl text-center col-span-full mx-auto mt-10"></span>
                ) : books.length === 0 ? (
                    <p className="text-center col-span-full mt-10">
                        No books found.
                    </p>
                ) : (
                    books.map((book) => (
                        <BooksCard key={book._id} book={book} />
                    ))
                )}
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    )
}
