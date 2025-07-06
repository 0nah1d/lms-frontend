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
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black cursor-pointer"
                onClick={handlePrev}
                disabled={page === 1}
            >
                {'<'}
            </button>
            <span className="text-base font-semibold">
                Page {page} of {totalPages}
            </span>
            <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 text-black cursor-pointer"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                {'>'}
            </button>
        </div>
    )
}
