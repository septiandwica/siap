import { useState, useEffect } from "react";
import { adminApi } from "../../../service/adminApi";

export default function useAdminData() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAdmins = async () => {
        setLoading(true);
        try {
        const res = await adminApi.getAdmins();
        setAdmins(parseAdminsResponse(res.data));
        } catch {
        setAdmins([]);
        } finally {
        setLoading(false);
        }
    };

    const addAdmin = async (payload) => {
        await adminApi.createAdmin(payload);
        await loadAdmins();
    };

    const updateAdmin = async (uid, payload) => {
        await adminApi.updateAdmin(uid, payload);
        await loadAdmins();
    };

    const deleteAdmin = async (uid) => {
        await adminApi.deleteAdmin(uid);
        await loadAdmins();
    };

    // convert object → array
    const parseAdminsResponse = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        return Object.keys(data).map((key) => ({ uid: key, ...data[key] }));
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    return {
        admins,
        loading,
        addAdmin,
        updateAdmin,
        deleteAdmin,
    };
}
