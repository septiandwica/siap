import express from "express";
import { isSuperAdmin } from "../middleware/superAdmin.js";
import { createAdmin } from "../controllers/adminController.js";

export default function (db) {
    const router = express.Router();
    router.post("/create-admin", isSuperAdmin, (req, res) => createAdmin(req, res, db));
    return router;
}
