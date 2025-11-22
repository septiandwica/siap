import React from "react";

export default function Modal({ isOpen, title, children, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
            ✕
            </button>

            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

            {children}
        </div>
        </div>
    );
}
