import { Users, User } from "lucide-react";

export default function StatsCards({ users }) {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status?.toLowerCase() === "online").length;
    const inactiveUsers = users.filter((u) => u.status?.toLowerCase() === "offline").length;
    const maleUsers = users.filter((u) => u.gender?.toLowerCase() === "male").length;
    const femaleUsers = users.filter((u) => u.gender?.toLowerCase() === "female").length;

    return (
        <div className="space-y-6">

            {/* === Total Users (1 card full width) === */}
            <div className="grid grid-cols-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Users className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* === Card lainnya (4 card dalam 1 baris) === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Active */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-gray-800">{activeUsers}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                {/* Inactive */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Inactive Users</p>
                            <p className="text-3xl font-bold text-gray-800">{inactiveUsers}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Users className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                {/* Male */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Male</p>
                            <p className="text-3xl font-bold text-gray-800">{maleUsers}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                {/* Female */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Female</p>
                            <p className="text-3xl font-bold text-gray-800">{femaleUsers}</p>
                        </div>
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                            <User className="text-pink-600" size={24} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
