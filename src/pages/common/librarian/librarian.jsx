import React, { useEffect, useState } from 'react'
import LibrarianCard from './elements/librarianCard.jsx'

export default function Librarian() {
    const [librarian, setLibrarian] = useState([])

    useEffect(() => {
        fetch('librarian.json')
            .then((res) => res.json())
            .then((data) => setLibrarian(data))
    }, [])

    return (
        <div className="w-11/12 mx-auto">
            <div className="px-5 text-center my-10">
                <h1 className="text-2xl lg:text-5xl font-semibold mb-4">
                    Meet Our Librarians
                </h1>
                <p className="text-gray-600">
                    Dedicated professionals who ensure smooth access to
                    knowledge and learning resources.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {librarian.map((lib) => (
                    <LibrarianCard key={lib.id} lib={lib}></LibrarianCard>
                ))}
            </div>
        </div>
    )
}
