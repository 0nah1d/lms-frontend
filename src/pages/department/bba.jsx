import React from 'react'
import CategoryPageTitle from '../../components/UI/categoryPageTitle.jsx'
import Search from '../../components/UI/search.jsx'

export default function Bba() {
    return (
        <div>
            <CategoryPageTitle
                title="Bachelor of Business Administration (BBA)"
                subtitle=" Discover books on management, marketing, finance, and entrepreneurship for tomorrow's leaders."
            ></CategoryPageTitle>

            {/* search  */}
            <Search search={''} setSearch={''}></Search>

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        </div>
    )
}
