import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { adminApi } from "../service/adminApi";

export default function MyProfileContent() {
  const [profile, setProfile] = useState({ name: "", email: "", role: "", uid: "" });
  const [originalProfile, setOriginalProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await adminApi.getProfile();
        
        // Handle axios response structure
        const data = response.data || response;
        
        if (data && data.uid) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "",
            uid: data.uid || "",
          });
          setOriginalProfile({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "",
            uid: data.uid || "",
          });

          // Update localStorage
          if (data.uid) localStorage.setItem("uid", data.uid);
          if (data.role) localStorage.setItem("role", data.role);
          // Also update the user object to keep it in sync
          const userObj = {
            uid: data.uid,
            email: data.email,
            name: data.name,
            role: data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
        } else {
          setError("No profile data received");
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError(err.response?.data?.message || err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      // Only send updatable fields (exclude uid and role from updates)
      const updateData = {
        name: profile.name,
        email: profile.email,
      };
      
      await adminApi.updateAdmin(profile.uid, updateData);
      alert("Profile updated successfully!");
      setOriginalProfile(profile);
      setEditMode(false);
      
      // Refresh profile data
      const response = await adminApi.getProfile();
      const data = response.data || response;
      if (data && data.uid) {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          uid: data.uid || "",
        });
        setOriginalProfile({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          uid: data.uid || "",
        });
        
        // Update localStorage after save
        const userObj = {
          uid: data.uid,
          email: data.email,
          name: data.name,
          role: data.role,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        if (data.uid) localStorage.setItem("uid", data.uid);
        if (data.role) localStorage.setItem("role", data.role);
      }
    } catch (err) {
      console.error("Update profile error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to update profile";
      alert(errorMsg);
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setError("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error && !profile.uid) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        My Profile {profile.role && `(${profile.role.toUpperCase()})`}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#b31f5e] to-[#d3543c]" />

        <div className="px-6 pb-6">
          <div className="flex items-end -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <User size={48} className="text-[#b31f5e]" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  editMode 
                    ? "border-gray-300 focus:ring-2 focus:ring-[#b31f5e] focus:border-transparent" 
                    : "bg-gray-100 cursor-not-allowed border-gray-200"
                }`}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  editMode 
                    ? "border-gray-300 focus:ring-2 focus:ring-[#b31f5e] focus:border-transparent" 
                    : "bg-gray-100 cursor-not-allowed border-gray-200"
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={profile.role || ""}
                disabled={true}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed border-gray-200"
              />
            </div>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Edit Profile
              </button>
            )}

            {editMode && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#b31f5e] to-[#d3543c] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
