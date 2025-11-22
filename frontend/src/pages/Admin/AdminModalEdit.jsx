import React from "react";
import { Modal } from "@/components";

export default function AdminModalEdit({ isOpen, onClose, onSubmit, data, setData, loading }) {
    if (!data) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Admin">
        <form onSubmit={onSubmit} className="space-y-4">
            <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={data?.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            />

            <input
            type="email"
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={data?.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            />

            <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] text-white rounded" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
            </div>
        </form>
        </Modal>
    );
}
