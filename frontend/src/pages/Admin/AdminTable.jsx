import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, formatTime } from "../../utils/formDate";

export default function AdminTable({ admins, currentUser, onEdit, onDelete }) {
    if (admins.length === 0)
        return <div className="p-4 text-center text-gray-500">Tidak ada data admin.</div>;

    return (
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
            {["NAME", "ROLE", "CREATED", "ACTION"].map((h) => (
                <th key={h} className={`px-6 py-3 text-xs font-semibold uppercase ${h === "NAME" ? "text-left" : "text-center"}`}>
                {h}
                </th>
            ))}
            </tr>
        </thead>

        <tbody>
            {admins.map((admin) => {
            const block = admin.role === "superadmin" && admin.uid !== currentUser?.uid;

            return (
                <tr key={admin.uid} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                    <span className="font-semibold">{admin.name}</span>
                    <div className="text-xs text-gray-500">{admin.email}</div>
                </td>

                <td className="px-6 py-4 text-center">
                    {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                </td>

                <td className="px-6 py-4 text-center">
                    <div>{formatDate(admin.createdAt)}</div>
                    <div className="text-xs text-gray-500">{formatTime(admin.createdAt)}</div>
                </td>

                <td className="px-6 py-4 text-center">
                    <button
                    disabled={block}
                    onClick={() => onEdit(admin)}
                    className={`text-indigo-600 mx-2 ${block ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                    <Edit size={18} />
                    </button>

                    <button
                    disabled={block}
                    onClick={() => onDelete(admin.uid)}
                    className={`text-red-600 mx-2 ${block ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                    <Trash2 size={18} />
                    </button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    );
}
