import { React, useState } from "react";
import StatsCards from "./StatsCards";
import UsersTable from "./UsersTable";
import UserActionsBar from "./UserActionsBar";
import UserModalView from "./UserModalView";
import UserModalAdd from "./UserModalAdd";
import { addUser } from "../../service/userApi"

import useUserData from "./hooks/useUserData";
import useUserFilter from "./hooks/useUserFilter";
import useUserForm from "./hooks/useUserForm";

export default function UsersContent() {
    const { users, loading, setUsers } = useUserData();
    const { filterStatus, searchQuery, setFilterStatus, setSearchQuery } =
        useUserFilter();
    const {
        isModalOpen,
        editingUser,
        isEditMode,
        openModal,
        closeModal,
        handleSubmit,
        handleDelete,
    } = useUserForm(users, setUsers);

    const [isAddOpen, setIsAddOpen] = useState(false);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading user...</p>
        </div>
    );;

    return (
        <>
            {/* MAIN PAGE CONTENT */}
            <div className="space-y-6 relative">
            <h2 className="text-3xl font-bold text-gray-800">User</h2>

            <StatsCards users={users} />

            <UserActionsBar
                filterStatus={filterStatus}
                searchQuery={searchQuery}
                setFilterStatus={setFilterStatus}
                setSearchQuery={setSearchQuery}
                setIsAddOpen={setIsAddOpen}
            />

            <UsersTable
                users={users}
                filterStatus={filterStatus}
                searchQuery={searchQuery}
                onEdit={openModal}
                onDelete={handleDelete}
            />
        </div>

        {isModalOpen && (
            <UserModalView
                isOpen={isModalOpen}
                user={editingUser}
                isEditMode={isEditMode}
                onClose={closeModal}
                onSave={handleSubmit}
            />
        )}

        <UserModalAdd
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onSave={async (formData) => {
                const newUser = await addUser(formData); // ← panggil API POST
                setUsers((prev) => [...prev, newUser.user]); // update data di UI
            }}
        />

        </>
    );
}
