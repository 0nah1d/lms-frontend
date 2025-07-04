import React from 'react'

export default function UseCategory({ image, category }) {
    return (
        <div>
            <div className="border-2 border-gray-300 rounded-md py-5 flex flex-col justify-center items-center">
                <img className="w-[100px]" src={image} alt="category image" />
                <p className="text-center text-gray-500 font-semibold">
                    {category}
                </p>
            </div>
        </div>
    )
}
