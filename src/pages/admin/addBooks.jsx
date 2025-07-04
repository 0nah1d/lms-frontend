import React from 'react'

export default function AddBooks() {
    const handleAddBook = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        // Get all values
        const book = {
            name: formData.get('name'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            category: formData.get('category'),
            quantity: formData.get('quantity'),
            link: formData.get('link'),
            image: formData.get('image'),
            details: formData.get('details'),
        }

        console.log(book)
        // You can now send `book` to your backend
    }

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow mt-10">
            <h2 className="text-2xl font-semibold mb-6">Add a New Book</h2>
            <form onSubmit={handleAddBook}>
                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Book Name*</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Book name"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        required
                    />
                </div>
                {/* Author & Genre */}
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">
                            Author*
                        </label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Author"
                            className="w-full border rounded px-3 py-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Genre*</label>
                        <input
                            type="text"
                            name="genre"
                            placeholder="Genre"
                            className="w-full border rounded px-3 py-2 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                {/* Category & Quantity */}
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full border rounded px-3 py-2 focus:outline-none"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option value="CSE">CSE</option>
                            <option value="BBA">BBA</option>
                            <option value="Civil">Civil</option>
                            <option value="English">English</option>
                            <option value="Islamic Studies">
                                Islamic Studies
                            </option>
                            <option value="LLB">LLB</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">
                            Quantity*
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            min={1}
                            className="w-full border rounded px-3 py-2 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                {/* Link */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Book Link*</label>
                    <input
                        type="url"
                        name="link"
                        placeholder="Google Drive or other link"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        required
                    />
                </div>
                {/* Image */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Book Image*
                    </label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Image URL"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        required
                    />
                </div>
                {/* Details */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">
                        Book Details*
                    </label>
                    <textarea
                        name="details"
                        placeholder="Book Details"
                        className="w-full border rounded px-3 py-2 focus:outline-none"
                        rows={4}
                        required
                    ></textarea>
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    className="bg-yellow-800 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2"
                >
                    Add Book
                    <span role="img" aria-label="book">
                        📚
                    </span>
                </button>
            </form>
        </div>
    )
}
