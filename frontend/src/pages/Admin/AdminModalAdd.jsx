import React from "react";
import { Modal } from "@/components";

export default function AdminModalAdd({ isOpen, onClose, onSubmit, form, setForm, loading }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Admin">
        <form onSubmit={onSubmit} className="space-y-4">
            <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            />

            <input
            type="email"
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            />

            <input
            type="password"
            className="border p-2 w-full rounded"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            />

            <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
            </button>

            <button className="px-4 py-2 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] text-white rounded" disabled={loading}>
                {loading ? "Creating..." : "Create"}
            </button>
            </div>
        </form>
        </Modal>
    );
}
