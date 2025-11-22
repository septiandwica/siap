import { db } from "../config/firebase.js";

/**
 * SUPERADMIN-ONLY MIDDLEWARE
 */
export async function isSuperAdmin(req, res, next) {
    try {
        const uid = req.headers["x-uid"];

        if (!uid) {
        return res.status(401).json({ message: "UID required" });
        }

        const snap = await db.ref("Users").child(uid).once("value");
        const user = snap.val();

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== "superadmin") {
        return res.status(403).json({ message: "SUPERADMIN only" });
        }

        req.user = { uid, role: "superadmin" };
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    }

    /**
     * ADMIN OR SUPERADMIN
     */
    export async function isAdmin(req, res, next) {
    try {
        const uid = req.headers["x-uid"];

        if (!uid) {
        return res.status(401).json({ message: "x-uid header missing" });
        }

        const snap = await db.ref("Users").child(uid).once("value");
        const user = snap.val();

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== "admin" && user.role !== "superadmin") {
        return res.status(403).json({ message: "Admins only" });
        }

        req.user = { uid, role: user.role };
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
