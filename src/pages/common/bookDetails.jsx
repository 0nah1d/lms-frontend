import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function BookDetails() {
    const book = useLoaderData()

    const { image, name, author, details, genre, link, quantity, _id } = book

    const [requestSent, setRequestSent] = useState(false)

    const handleBorrowBook = () => {}

    return (
        <div className="card card-side bg-base-100 shadow-sm my-10 max-w-4xl mx-auto">
            <figure className="w-full flex-1/3">
                <img className="w-full" src={image} alt="Book" />
            </figure>
            <div className="card-body flex-2/3">
                <h2 className="card-title">{name}</h2>
                <p>Author : {author}</p>
                <p>Genre : {genre}</p>
                <p>Quantity : {quantity}</p>
                <p>{details}</p>
                <div className="card-actions gap-5">
                    {quantity === 0 ? (
                        <button className="btn btn-disabled">
                            Not Available
                        </button>
                    ) : requestSent ? (
                        <button className="btn btn-info btn-disabled">
                            Request Sent
                        </button>
                    ) : (
                        <button
                            onClick={handleBorrowBook}
                            className="btn btn-success text-white"
                        >
                            Add to Borrow
                        </button>
                    )}

                    <a
                        href={link}
                        target="_blank"
                        className="btn btn-success text-white"
                    >
                        Download
                    </a>
                </div>
            </div>
        </div>
    )
}
