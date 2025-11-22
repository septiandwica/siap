// src/pages/Users/hooks/useUserForm.js
import { useState } from "react";
import { updateUser, deleteUser } from "../../../service/userApi";

export default function useUserForm(users, setUsers) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const openModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
        setIsEditMode(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setIsEditMode(false);
    };

    const startEdit = () => setIsEditMode(true);
    const stopEdit = () => setIsEditMode(false);

    const handleSubmit = async (updatedUser = null) => {
        const userToSave = updatedUser || editingUser;
        if (!userToSave) return;
        try {
        await updateUser(userToSave.id, userToSave);
        setUsers((prev) =>
            prev.map((u) => (u.id === userToSave.id ? userToSave : u))
        );
        closeModal();
        alert("User updated successfully!");
        } catch (err) {
        console.error("Update failed:", err);
        alert("Failed to update user.");
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this user?");
        if (!ok) return;
        try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        alert("User deleted successfully!");
        } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete user.");
        }
    };

    return {
        isModalOpen,
        editingUser,
        isEditMode,
        openModal,
        closeModal,
        startEdit,
        stopEdit,
        handleSubmit,
        handleDelete,
        setEditingUser, // 🔹 penting untuk UserModalView
    };
}
