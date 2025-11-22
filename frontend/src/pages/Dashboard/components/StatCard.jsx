import React from "react";

export default function StatCard({ label, value, icon: Icon, bg, color }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value ?? 0}</p>
            </div>
            <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
            <Icon className={color} size={24} />
            </div>
        </div>
        </div>
    );
}
