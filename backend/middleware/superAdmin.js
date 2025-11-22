import { db } from "../config/firebase.js";

export async function isSuperAdmin(req, res, next) {
    try {
        const { uid } = req.headers;

        if (!uid) {
        return res.status(401).json({ message: "UID required" });
        }

        const userSnap = await db.ref("Users").child(uid).once("value");
        const user = userSnap.val();

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== "superadmin") {
        return res.status(403).json({ message: "SUPERADMIN only" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
