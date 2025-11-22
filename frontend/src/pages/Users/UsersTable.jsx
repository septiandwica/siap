// src/pages/Users/UsersTable.jsx
import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import useUserPagination from "./hooks/useUserPagination";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function UsersTable({
    users,
    filterStatus,
    searchQuery,
    onEdit,
    onDelete,
}) {
    const [openMenu, setOpenMenu] = useState(null);

    // Filter status
    const filteredByStatus = users.filter((user) => {
        if (!filterStatus || filterStatus === "All") return true;
        return (user.status || "").toLowerCase() === filterStatus.toLowerCase();
    });

    // Filter search
    const filteredBySearch = filteredByStatus.filter((user) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (user.nickname || "").toLowerCase().includes(q) ||
            (user.email || "").toLowerCase().includes(q)
        );
    });

    // Sort by createDate desc
    const sortedUsers = [...filteredBySearch].sort((a, b) => {
        const da = Number(a.createDate) || 0;
        const db = Number(b.createDate) || 0;
        return db - da;
    });

    // Pagination
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { page, setPage, totalPages, paginated } = useUserPagination(
        sortedUsers,
        itemsPerPage
    );
    
    useEffect(() => {
        setPage(1);
    }, [searchQuery, filterStatus, itemsPerPage]);
    
    const currentUsers = paginated;

    const indexOfFirstItem = (page - 1) * itemsPerPage + (sortedUsers.length > 0 ? 1 : 0);
    const indexOfLastItem = indexOfFirstItem + currentUsers.length - (sortedUsers.length > 0 ? 0 : 1);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".user-menu") || event.target.closest(".menu-button")) return;
            setOpenMenu(null);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) setPage(newPage);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }

        return pages.map((p, idx) => {
            if (p === "...") {
                return <span key={idx} className="px-3 py-1 text-gray-400">...</span>;
            }
        
            const pageNum = Number(p);
        
            return (
                <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded-lg ${
                        page === pageNum
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 hover:bg-gray-100"
                    } transition`}
                >
                    {pageNum}
                </button>
            );
        });        
    };

    const formatDate = (ts) => {
        if (!ts) return "-";
        const d = new Date(Number(ts) * 1000);
        return d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const formatTime = (ts) => {
        if (!ts) return "";
        const d = new Date(Number(ts) * 1000);
        return d.toLocaleTimeString();
    };

    const getPhoto = (photo) => {
        if (!photo || typeof photo !== "string") return DEFAULT_AVATAR;
        if (photo.toLowerCase().includes("googleusercontent")) return DEFAULT_AVATAR;
        return photo;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERS</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED DATE</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAST ACTIVE</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">LIKE</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DISLIKE</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">MEMBER</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            src={getPhoto(user.photo)}
                                            alt={user.nickname || "User Avatar"}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="ml-4 text-left">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.nickname || "Unnamed User"}
                                            </div>
                                            <div className="text-sm text-gray-500">{user.email || "-"}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{formatDate(user.createDate)}</div>
                                    <div className="text-sm text-gray-500">{formatTime(user.createDate)}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{formatDate(user.lastLogin)}</div>
                                    <div className="text-sm text-gray-500">{formatTime(user.lastLogin)}</div>
                                </td>

                                <td className="px-6 py-4 text-center text-sm text-gray-900">{user.like ?? 0}</td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">{user.dislike ?? 0}</td>

                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                                        user.status === "online"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {user.status || "offline"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-green-100 text-green-800">
                                        {user.memberType || "Free"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button
                                        // disabled={block}
                                        onClick={() => onEdit(user)}
                                        className={`text-indigo-600 mx-2`}
                                    >
                                        <Edit size={18} />
                                    </button>

                                    <button
                                        // disabled={block}
                                        onClick={() => onDelete(user.id)}
                                        className={`text-red-600 mx-2`}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600">
                <div>
                    Results:{" "}
                    {sortedUsers.length === 0 ? 0 : indexOfFirstItem} - {indexOfLastItem} of{" "}
                    {sortedUsers.length}
                </div>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        &lt;
                    </button>

                    {renderPageNumbers()}

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        &gt;
                    </button>

                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="ml-3 border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                        {[10, 20, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
