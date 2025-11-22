import { useEffect, useState, useRef } from "react";
import { getUsers } from "../../../service/userApi";
import { dashboardApi } from "../../../service/dashboardApi";

export default function useDashboardData() {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const [summary, setSummary] = useState({
        totalUsers: 0,
        totalSwipes: 0,
        totalMatches: 0,
        dailyMatches: {},
        dailySwipes: {}
    });

    const [statsLoading, setStatsLoading] = useState(true);
    const [summaryError, setSummaryError] = useState(null);

    const pollingRef = useRef(null);
    const POLL_INTERVAL_MS = 5000;

    /* Load users once */
    useEffect(() => {
        let mounted = true;

        const loadUsers = async () => {
        try {
            setLoadingUsers(true);
            const raw = await getUsers();

            const arr = raw
            ? Object.keys(raw).map((k) => ({ id: k, ...raw[k] }))
            : [];

            const enriched = arr.map((u) => {
            const createKey = u.createDate
                ? new Date(u.createDate * 1000).toISOString().split("T")[0]
                : null;
            const loginKey = u.lastLogin
                ? new Date(u.lastLogin * 1000).toISOString().split("T")[0]
                : null;
            return { ...u, createKey, loginKey };
            });

            if (!mounted) return;
            setUsers(enriched);
        } catch (err) {
            console.error("Error loading users:", err);
        } finally {
            if (mounted) setLoadingUsers(false);
        }
        };

        loadUsers();
        return () => (mounted = false);
    }, []);

    /* Load dashboard summary */
    const loadSummary = async () => {
        try {
        setStatsLoading(true);
        setSummaryError(null);
        const data = await dashboardApi.getSummary();

        if (data?.summary) {
            setSummary(data.summary);
        } else {
            setSummaryError("Invalid response format");
        }
        } catch (err) {
        setSummaryError(err.message || "Failed to load dashboard data");
        } finally {
        setStatsLoading(false);
        }
    };

    /* Polling summary every 5 seconds */
    useEffect(() => {
        loadSummary();

        if (pollingRef.current) clearInterval(pollingRef.current);

        pollingRef.current = setInterval(loadSummary, POLL_INTERVAL_MS);

        return () => {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
        };
    }, []);

    return {
        users,
        summary,
        summaryError,
        loadingUsers,
        statsLoading,
    };
}
