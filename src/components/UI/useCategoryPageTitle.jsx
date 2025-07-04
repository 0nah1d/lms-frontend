import React from 'react'

export default function UseCategoryPageTitle({ title, subtitle }) {
    return (
        <div className="text-center mt-0 md:mt-10 mb-6 lg:mb-10 bg-gray-50 py-7">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-0 md:mb-4">
                {title}
            </h1>
            <p className="text-gray-500">{subtitle}</p>
        </div>
    )
}
