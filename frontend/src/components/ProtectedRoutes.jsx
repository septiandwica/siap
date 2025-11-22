import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <Navigate to="/login" />;

    if (user.role !== "admin" && user.role !== "superadmin") {
        return <Navigate to="/login" />;
    }

    return children;
}
