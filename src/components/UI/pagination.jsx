import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1)
    }

    return (
        <div className="mt-4 flex justify-center gap-4">
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                onClick={handlePrev}
                disabled={page === 1}
            >
                {'<'}
            </button>
            <span className="text-lg font-semibold">
                Page {page} of {totalPages}
            </span>
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                {'>'}
            </button>
        </div>
    )
}
