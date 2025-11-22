import React from "react";

export default function Select({ options, value, onChange, className }) {
    return (
        <select
        value={value}
        onChange={onChange}
        className={`border px-3 py-2 rounded ${className}`}
        >
        {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
            {opt.label}
            </option>
        ))}
        </select>
    );
}
