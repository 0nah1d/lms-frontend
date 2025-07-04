import React, { useState } from 'react'
import UseCategoryPageTitle from '../../components/UI/useCategoryPageTitle.jsx'
import BooksCard from '../../components/UI/booksCard.jsx'
import UseSearch from '../../components/UI/useSearch.jsx'

export default function Law() {
    const [search, setSearch] = useState('')

    return (
        <div>
            <UseCategoryPageTitle
                title="Bachelor of Laws (LLB)"
                subtitle="Access a wide range of books on legal systems, case laws, ethics, and jurisprudence."
            ></UseCategoryPageTitle>

            {/* search  */}
            <UseSearch search={search} setSearch={setSearch}></UseSearch>

            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <span className="loading loading-bars loading-xl text-center"></span>

                <BooksCard key={1} book={{}}></BooksCard>
            </div>
        </div>
    )
}
