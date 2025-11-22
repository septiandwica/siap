import express from "express";
import {
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getSuperAdmin,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/auth.js";

export default function (db) {
    const router = express.Router();

    // NEW ENDPOINT → returns own profile
    router.get("/me", isAdmin, async (req, res) => {
        const uid = req.user.uid;

        const snap = await db.ref("Users").child(uid).once("value");
        const user = snap.val();

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ uid, ...user });
    });

    router.get("/", isAdmin, (req, res) => getAdmins(req, res, db));
    router.get("/superadmin", isAdmin, (req, res) => getSuperAdmin(req, res, db));
    router.post("/", isAdmin, (req, res) => createAdmin(req, res, db));
    router.put("/:uid", isAdmin, (req, res) => updateAdmin(req, res, db));
    router.delete("/:uid", isAdmin, (req, res) => deleteAdmin(req, res, db));

    return router;
}
