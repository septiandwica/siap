import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const getAdmins = async (req, res, db) => {
    try {
        const snapshot = await db.ref("Users").once("value");
        const users = snapshot.val() || {};

        // only return admin + superadmin
        const filtered = Object.fromEntries(
            Object.entries(users).filter(([_, u]) =>
                u.role === "admin" || u.role === "superadmin"
            )
        );

        res.status(200).json(filtered);
    } catch (err) {
        console.error("Get admins error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const createAdmin = async (req, res, db) => {
    try {
        const { email, name, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const uid = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            uid,
            email,
            name,
            password: hashedPassword,
            role: "admin",
            createdAt: Date.now(),
        };

        await db.ref("Users").child(uid).set(data);

        res.status(201).json({ message: "Admin created", uid });
    } catch (err) {
        console.error("Create admin error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateAdmin = async (req, res, db) => {
    try {
        const { uid } = req.params;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const updates = { ...req.body };

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        await db.ref("Users").child(uid).update(updates);

        res.status(200).json({ message: "Admin updated", updates });
    } catch (err) {
        console.error("Update admin error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const deleteAdmin = async (req, res, db) => {
    try {
        const { uid } = req.params;

        const targetSnap = await db.ref("Users").child(uid).once("value");
        const target = targetSnap.val();

        if (!target) {
            return res.status(404).json({ message: "Target admin not found" });
        }

        // Superadmin tidak boleh dihapus sama sekali
        if (target.role === "superadmin") {
            return res.status(403).json({ message: "Superadmin cannot be deleted" });
        }

        // admin tidak boleh delete admin
        if (req.user.role === "admin" && target.role === "admin") {
            return res.status(403).json({ message: "Admin cannot delete another admin" });
        }

        await db.ref("Users").child(uid).remove();
        res.status(200).json({ message: "Admin deleted" });

    } catch (err) {
        console.error("Delete admin error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const getSuperAdmin = async (req, res, db) => {
    try {
        const snap = await db.ref("Users")
            .orderByChild("role")
            .equalTo("superadmin")
            .once("value");

        const data = snap.val();

        if (!data) {
            return res.status(404).json({ message: "No superadmins found" });
        }

        // Return list of all superadmins
        const list = Object.keys(data).map(uid => ({
            uid,
            ...data[uid]
        }));

        res.status(200).json(list);
    } catch (err) {
        console.error("Get superadmin error:", err);
        res.status(500).json({ message: err.message });
    }
};
