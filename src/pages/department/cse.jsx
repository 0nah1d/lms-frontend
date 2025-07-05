import React from 'react'
import BooksCard from '../../components/UI/booksCard.jsx'
import CategoryPageTitle from '../../components/UI/categoryPageTitle.jsx'
import Search from '../../components/UI/search.jsx'

export default function Cse() {
    return (
        <div>
            <CategoryPageTitle
                title="Computer Science and Engineering (CSE)"
                subtitle="Dive into algorithms, software engineering, AI, and everything shaping the digital future."
            />

            <Search search={''} setSearch={''}></Search>

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <span className="loading loading-bars loading-xl text-center"></span>

                <BooksCard key={1} book={{}} />
            </div>
        </div>
    )
}
