import React, { useMemo } from "react";
import { Users, UserCheck, UserX, MousePointer } from "lucide-react";
import useDashboardData from "./hooks/useDashboardData";

import StatCard from "./components/StatCard";
import ChartCard from "./components/ChartCard";

export default function DashboardContent() {
    const {
        users,
        summary,
        summaryError,
        loadingUsers,
        statsLoading,
    } = useDashboardData();

    /* Build chart data */
    const chartData = useMemo(() => {
        const { dailyMatches = {}, dailySwipes = {} } = summary;
        const today = new Date();

        const registerMap = {};
        const loginMap = {};

        users.forEach((u) => {
        if (u.createKey)
            registerMap[u.createKey] = (registerMap[u.createKey] || 0) + 1;
        if (u.loginKey)
            loginMap[u.loginKey] = (loginMap[u.loginKey] || 0) + 1;
        });

        const arr = [];

        for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const key = d.toISOString().split("T")[0];
        const label = d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        arr.push({
            date: label,
            register: registerMap[key] || 0,
            lastLogin: loginMap[key] || 0,
            match: dailyMatches[key] || 0,
            swipe: dailySwipes[key] || 0,
        });
        }

        return arr;
    }, [users, summary]);

    /* Derived stats */
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status?.toLowerCase() === "online").length;
    const inactiveUsers = users.filter((u) => u.status?.toLowerCase() === "offline").length;
    const maleUsers = users.filter((u) => u.gender?.toLowerCase() === "male").length;
    const femaleUsers = users.filter((u) => u.gender?.toLowerCase() === "female").length;

    if (loadingUsers) {
        return (
        <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading dashboard...</p>
        </div>
        );
    }

    return (
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

            <div className="flex items-center gap-2">
            {summaryError && (
                <span className="text-sm text-red-500">Error: {summaryError}</span>
            )}
            <div className="text-sm text-gray-500">
                {statsLoading ? "Updating…" : "Updated"}
            </div>
            </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
            <StatCard
                label="Total Users"
                value={totalUsers}
                icon={Users}
                bg="bg-purple-100"
                color="text-purple-600"
            />
            </div>

            <StatCard
            label="Total Swipes"
            value={summary.totalSwipes}
            icon={MousePointer}
            bg="bg-blue-100"
            color="text-blue-600"
            />

            <StatCard
            label="Total Matches"
            value={summary.totalMatches}
            icon={MousePointer}
            bg="bg-pink-100"
            color="text-pink-600"
            />
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
            label="Active Users"
            value={activeUsers}
            icon={UserCheck}
            bg="bg-green-100"
            color="text-green-600"
            />

            <StatCard
            label="Inactive Users"
            value={inactiveUsers}
            icon={UserX}
            bg="bg-gray-100"
            color="text-gray-600"
            />

            <StatCard
            label="Male Users"
            value={maleUsers}
            icon={Users}
            bg="bg-blue-100"
            color="text-blue-600"
            />

            <StatCard
            label="Female Users"
            value={femaleUsers}
            icon={Users}
            bg="bg-pink-100"
            color="text-pink-600"
            />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="User Register" dataKey="register" color="#8b5cf6" chartData={chartData} />
            <ChartCard title="User Last Login" dataKey="lastLogin" color="#10b981" chartData={chartData} />
            <ChartCard title="Daily Matches" dataKey="match" color="#ec4899" chartData={chartData} />
            <ChartCard title="Daily Swipes" dataKey="swipe" color="#3b82f6" chartData={chartData} />
        </div>
        </div>
    );
}
