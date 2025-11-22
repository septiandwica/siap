import { Search, User as UserIcon } from "lucide-react";

export default function UserActionsBar({
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    setIsAddOpen,
}) {
    return (
        <div
        className="flex flex-col md:flex-row justify-between items-center 
                        space-y-4 md:space-y-0 bg-white p-4 rounded-xl shadow-md 
                        border border-gray-100"
        >
        <button
            className="px-4 py-2 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] 
                    text-white font-medium rounded-lg hover:opacity-90 
                    transition-colors flex items-center gap-2 shadow-lg"
            onClick={() => setIsAddOpen(true)}
        >
            <UserIcon size={20} />
            Add User
        </button>

        <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            >
            <option>All</option>
            <option>Online</option>
            <option>Offline</option>
            </select>

            <div className="relative w-full md:w-64">
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
            </div>
        </div>
        </div>
    );
}
