import axios from "axios";

const BASE_URL = "http://localhost:2005/api/admins";

function axiosInstance() {
    const userStr = localStorage.getItem("user");
    let uid = null;
    let role = null;

    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            uid = user.uid || localStorage.getItem("uid");
            role = user.role || localStorage.getItem("role");
        } catch (e) {
            uid = localStorage.getItem("uid");
            role = localStorage.getItem("role");
        }
    } else {
        uid = localStorage.getItem("uid");
        role = localStorage.getItem("role");
    }

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
            "x-uid": uid,
            "x-role": role,
        },
    });
}

export const adminApi = {
    getProfile: async () => axiosInstance().get("/me"),
    getAdmins: async () => axiosInstance().get("/"),
    getSuperAdmins: async () => axiosInstance().get("/superadmin"),
    createAdmin: async (data) => axiosInstance().post("/", data),
    createSuperAdmin: async (data) => axiosInstance().post("/", {
        ...data,
        role: "superadmin",
    }),
    updateAdmin: async (uid, data) => axiosInstance().put(`/${uid}`, data),
    deleteAdmin: async (uid) => axiosInstance().delete(`/${uid}`),
};
