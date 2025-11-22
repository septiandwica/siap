import React from "react";

export default function TableHeader({ columns }) {
    return (
        <thead className="bg-gray-100 border-b">
        <tr>
            {columns.map((col, idx) => (
            <th key={idx} className="text-left px-4 py-2 font-medium">
                {col}
            </th>
            ))}
        </tr>
        </thead>
    );
}
