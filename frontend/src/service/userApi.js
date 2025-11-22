import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
    const res = await axiosInstance.get("/users");
    return res.data;
};

export const getUserByUid = async (uid) => {
    const res = await axiosInstance.get(`/users/${uid}`);
    return res.data;
}

export const addUser = async (userData) => {
    const res = await axiosInstance.post("/users", userData);
    return res.data;
}

export const updateUser = async (uid, updatedData) => {
    const res = await axiosInstance.put(`/users/${uid}`, updatedData);
    return res.data;
}

export const deleteUser = async (uid) => {
    const res = await axiosInstance.delete(`/users/${uid}`);
    return res.data;
}