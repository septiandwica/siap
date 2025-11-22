import React from "react";

export default function SearchBox({ value, onChange, placeholder = "Search..." }) {
    return (
        <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border px-3 py-2 rounded w-full max-w-xs focus:outline-blue-500"
        />
    );
}
