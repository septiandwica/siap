import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Search, MoreVertical, User, RefreshCw } from 'lucide-react';

export default function ActivationRequestContent() {
    // Hardcode data untuk status overview
    const stats = [
        { title: 'Total Requests', value: '25', icon: Clock, color: 'bg-yellow-500/10 text-yellow-600', countColor: 'text-yellow-600' },
        { title: 'Pending', value: '8', icon: Clock, color: 'bg-blue-500/10 text-blue-600', countColor: 'text-blue-600' },
        { title: 'Activated', value: '15', icon: CheckCircle, color: 'bg-green-500/10 text-green-600', countColor: 'text-green-600' },
        { title: 'Denied', value: '2', icon: XCircle, color: 'bg-red-500/10 text-red-600', countColor: 'text-red-600' },
    ];

    // Hardcode data untuk tabel
    const requestData = [
        { 
            id: 1, 
            user: { name: 'Fahmi Ridwan', email: 'fahmi.r@email.com', avatarUrl: 'https://placehold.co/40x40/3b82f6/ffffff?text=FR' }, 
            dateRequested: '2025-10-27', 
            status: 'Pending', 
            reason: 'Accidental Deactivation'
        },
        { 
            id: 2, 
            user: { name: 'Dewi Sartika', email: 'dewi.s@mail.com', avatarUrl: 'https://placehold.co/40x40/500099/ffffff?text=DS' }, 
            dateRequested: '2025-10-26', 
            status: 'Activated', 
            reason: 'Temporary Suspension'
        },
        { 
            id: 3, 
            user: { name: 'Ahmad Syaifullah', email: 'ahmad.s@gmail.com', avatarUrl: 'https://placehold.co/40x40/10b981/ffffff?text=AS' }, 
            dateRequested: '2025-10-25', 
            status: 'Denied', 
            reason: 'Policy Violation'
        },
        { 
            id: 4, 
            user: { name: 'Rina Wijaya', email: 'rina.w@yahoo.com', avatarUrl: 'https://placehold.co/40x40/ef4444/ffffff?text=RW' }, 
            dateRequested: '2025-10-24', 
            status: 'Pending', 
            reason: 'Forgotten Password'
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="px-3 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Pending</span>;
            case 'Activated':
                return <span className="px-3 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Activated</span>;
            case 'Denied':
                return <span className="px-3 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Denied</span>;
            default:
                return <span className="px-3 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Activation Request Management</h1>
            
            {/* 1. Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className={`mt-1 text-3xl font-extrabold ${stat.countColor}`}>{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Controls and Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-5 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-150 flex items-center gap-2 shadow-md">
                            <RefreshCw size={20} />
                            <span>Force Account Activation</span>
                        </button>
                        <select className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-purple-500 focus:border-purple-500">
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Activated</option>
                            <option>Denied</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm w-64"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REASON</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE REQUESTED</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requestData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover" src={item.user.avatarUrl} alt={item.user.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.user.name}</div>
                                                <div className="text-sm text-gray-500">{item.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateRequested}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            {item.status === 'Pending' && (
                                                <>
                                                    <button 
                                                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition"
                                                        title="Activate Account"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                                        title="Deny Request"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition"
                                                title="More Actions"
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600">
                    <div>
                        Showing 1 to 4 of 25 results
                    </div>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition">Previous</button>
                        <button className="px-3 py-1 border border-purple-500 bg-purple-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
