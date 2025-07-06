import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function BookDetails() {
    const book = useLoaderData()
    const {
        image_url,
        title,
        author,
        description,
        genre,
        book_link,
        stock,
        _id,
    } = book

    const [requestSent, setRequestSent] = useState(false)

    const handleBorrowBook = () => {
        setRequestSent(true)
    }

    return (
        <div className="card card-side bg-base-100 shadow-sm my-10 max-w-4xl mx-auto">
            <figure className="w-full md:w-1/3">
                <img className="w-full" src={image_url} alt={title} />
            </figure>
            <div className="card-body w-full md:w-2/3">
                <h2 className="card-title">{title}</h2>
                <p>
                    <strong>Author:</strong> {author}
                </p>
                <p>
                    <strong>Genre:</strong> {genre}
                </p>
                <p>
                    <strong>Available Stock:</strong> {stock}
                </p>
                <p className="mt-2">{description}</p>
                <div className="card-actions gap-5 mt-4">
                    {stock === 0 ? (
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

                    {book_link && (
                        <a
                            href={book_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success text-white"
                        >
                            Download
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
