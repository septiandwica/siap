import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Props:
 * - isOpen: boolean
 * - user: object (the user to view/edit)
 * - isEditMode: boolean (optional, if parent wants to control)
 * - onClose(): close modal
 * - onSave(updatedUser): async function to save changes (should update parent list as well)
 * - onDelete? (optional) not included here because delete handled by table action normally
 */
export default function UserModalView({
    isOpen = false,
    user = null,
    isEditMode: controlledEditMode = undefined,
    onClose = () => {},
    onSave = async () => {},
}) {
    const [localUser, setLocalUser] = useState(user || null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLocalUser(user ? { ...user } : null);
    }, [user]);

    useEffect(() => {
        if (typeof controlledEditMode !== "undefined") {
        setIsEditMode(controlledEditMode);
        }
    }, [controlledEditMode]);

    if (!isOpen || !localUser) return null;

    const avatarSrc =
        !localUser.photo || typeof localUser.photo !== "string"
        ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        : localUser.photo.toLowerCase().includes("googleusercontent")
        ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        : localUser.photo;

    const handleFieldChange = (field, value) => {
        setLocalUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
        await onSave(localUser);
        setIsEditMode(false);
        onClose();
        } catch (err) {
        console.error("Save failed:", err);
        alert("Failed to save user.");
        } finally {
        setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 m-0 p-0">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8 relative">
            <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="close"
            >
            <X size={22} />
            </button>

            <div className="flex flex-col items-center mb-6">
            <img
                src={avatarSrc}
                alt="User Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">{localUser.nickname || "Unnamed User"}</h2>
            <p className="text-gray-500 text-sm">
                {localUser.gender ? localUser.gender.charAt(0).toUpperCase() + localUser.gender.slice(1) : "—"}
            </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
            {/* Nickname */}
            <div>
                <label className="text-sm font-medium text-gray-700">Nickname</label>
                <input
                type="text"
                value={localUser.nickname || ""}
                onChange={(e) => handleFieldChange("nickname", e.target.value)}
                readOnly={!isEditMode}
                className={`border p-2 rounded-md w-full ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
            </div>

            {/* Birth Day */}
            <div>
                <label className="text-sm font-medium text-gray-700">Birth Day</label>
                <input
                type="text"
                value={localUser.birthDay || ""}
                onChange={(e) => handleFieldChange("birthDay", e.target.value)}
                readOnly={!isEditMode}
                className={`border p-2 rounded-md w-full ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="DD / MM / YYYY"
                />
            </div>

            {/* Gender */}
            <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            {!isEditMode ? (
                <div className="border p-2 rounded-md bg-gray-100 text-gray-700">
                {localUser.gender || "—"}
                </div>
            ) : (
                <select
                value={localUser.gender || ""}
                onChange={(e) => handleFieldChange("gender", e.target.value)}
                className="border p-2 rounded-md w-full"
                >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            )}
            </div>

            {/* Phone */}
            <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                type="text"
                value={localUser.phone || ""}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                readOnly={!isEditMode}
                className={`border p-2 rounded-md w-full ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
            </div>

            {/* Status */}
            <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            {!isEditMode ? (
                <div className="border p-2 rounded-md bg-gray-100 text-gray-700">
                {localUser.status || "—"}
                </div>
            ) : (
                <select
                value={localUser.status || ""}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="border p-2 rounded-md w-full"
                >
                <option value="">Select Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                </select>
            )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
                {!isEditMode ? (
                <>
                    <button
                    type="button"
                    onClick={() => setIsEditMode(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] text-white rounded-lg hover:opacity-90"
                    >
                    Edit
                    </button>
                    <button
                    type="button"
                    onClick={() => onClose()}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                    Close
                    </button>
                </>
                ) : (
                <>
                    <button
                    type="button"
                    onClick={() => {
                        // cancel: reset local form to prop user values
                        setLocalUser(user ? { ...user } : null);
                        setIsEditMode(false);
                    }}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                    {saving ? "Saving..." : "Save"}
                    </button>
                </>
                )}
            </div>
            </form>
        </div>
        </div>
    );
}
