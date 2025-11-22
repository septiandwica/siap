import React, { useState } from "react";
import { X } from "lucide-react";

export default function UserModalAdd({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        nickname: "",
        birthDay: "",
        gender: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        const { nickname, birthDay, gender, email, phone } = formData;

        if (!nickname || !birthDay || !gender || !email || !phone) {
            alert("Please fill all fields");
            return;
        }

        onSave(formData);
        onClose();

        // Reset form
        setFormData({
            nickname: "",
            birthDay: "",
            gender: "",
            email: "",
            phone: "",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-bold mb-5">Add New User</h2>

                <div className="space-y-4">
                    
                    {/* Nickname */}
                    <div>
                        <label className="block mb-1 font-medium">Nickname</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Nickname"
                        />
                    </div>

                    {/* Birthday */}
                    <div>
                        <label className="block mb-1 font-medium">Birth Day</label>
                        <input
                            type="date"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block mb-1 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="example@email.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Phone number"
                        />
                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
                >
                    Save User
                </button>
            </div>
        </div>
    );
}
