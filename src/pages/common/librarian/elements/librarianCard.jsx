import React from 'react'

export default function LibrarianCard({ lib }) {
    const { name, email, image, position, phone } = lib
    return (
        <div className="card card-side bg-base-100 shadow-sm">
            <figure>
                <img src={image} alt="Librarian's Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Position: {position}</p>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    )
}
