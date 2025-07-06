import React from 'react'
import { Link } from 'react-router-dom'

export default function BooksCard({ book }) {
    const { image_url, name, genre, author, _id } = book
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-10 pt-10">
                <img src={image_url} alt="Book" className="h-[250px] rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>Genre : {genre}</p>
                <p>Author : {author}</p>
                <div className="card-actions">
                    <Link to={`/book/${_id}`}>
                        <button className="btn btn-success text-white">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
