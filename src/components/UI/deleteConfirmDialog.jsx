import React, { useEffect, useState } from 'react'

export default function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    message,
}) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            const timeout = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    if (!visible) return null

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`bg-white p-6 rounded shadow-lg text-black
          transform transition-transform duration-300
          ${isOpen ? 'scale-100' : 'scale-95'}`}
            >
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
