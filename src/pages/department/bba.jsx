import React from 'react'
import UseCategoryPageTitle from '../../components/UI/useCategoryPageTitle.jsx'
import UseSearch from '../../components/UI/useSearch.jsx'

export default function Bba() {
    return (
        <div>
            <UseCategoryPageTitle
                title="Bachelor of Business Administration (BBA)"
                subtitle=" Discover books on management, marketing, finance, and entrepreneurship for tomorrow's leaders."
            ></UseCategoryPageTitle>

            {/* search  */}
            <UseSearch search={''} setSearch={''}></UseSearch>

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        </div>
    )
}
