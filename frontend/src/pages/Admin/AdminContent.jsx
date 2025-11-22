import React, { useState } from "react";
import { User } from "lucide-react";
import useAdminData from "./hooks/useAdminData";
import AdminTable from "./AdminTable";
import AdminModalAdd from "./AdminModalAdd";
import AdminModalEdit from "./AdminModalEdit";
import SearchBox from "../../components/SearchBox";

export default function AdminContent() {
    const { admins, loading, addAdmin, updateAdmin, deleteAdmin } = useAdminData();

    const [searchQuery, setSearchQuery] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "admin" });
    const [editData, setEditData] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const filteredData = admins.filter((a) =>
        `${a.name} ${a.email}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* MAIN CONTENT */}
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin User Management</h1>

                {/* Add Admin Button + Search */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center 
                        space-y-4 md:space-y-0 bg-white p-4 rounded-xl shadow-md 
                        border border-gray-100"
                >
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] 
                            text-white font-medium rounded-lg hover:opacity-90 
                            transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <User size={20} /> Add Admin
                    </button>

                    <SearchBox
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border">
                    {loading ? (
                        <div className="p-6 text-center text-gray-500">Loading admin...</div>
                    ) : (
                        <AdminTable
                            admins={filteredData}
                            currentUser={currentUser}
                            onEdit={(admin) => {
                                setEditData(admin);
                                setIsEditOpen(true);
                            }}
                            onDelete={(uid) => deleteAdmin(uid)}
                        />
                    )}
                </div>
            </div>

            <AdminModalAdd
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                form={addForm}
                setForm={setAddForm}
                onSubmit={async (e) => {
                    e.preventDefault();
                    await addAdmin(addForm);
                    setIsAddOpen(false);
                    setAddForm({ name: "", email: "", password: "", role: "admin" });
                }}
                loading={loading}
            />

            <AdminModalEdit
                isOpen={isEditOpen}
                onClose={() => {
                    setIsEditOpen(false);
                    setEditData(null);
                }}
                data={editData}
                setData={setEditData}
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (editData?.uid) {
                        await updateAdmin(editData.uid, editData);
                        setIsEditOpen(false);
                        setEditData(null);
                    }
                }}
                loading={loading}
            />
        </>
    );
}
