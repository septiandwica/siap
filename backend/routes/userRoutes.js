import express from "express";
import { getUsers, getUserByUid, addUser, updateUser, deleteUser } from "../controllers/userController.js";

export default function (db) {
    const router = express.Router();

    router.get("/", (req, res) => getUsers(req, res, db));
    router.get("/:uid", (req, res) => getUserByUid(req, res, db));
    router.post("/", (req, res) => addUser(req, res, db));
    router.put("/:uid", (req, res) => updateUser(req, res, db));
    router.delete("/:uid", (req, res) => deleteUser(req, res, db));

    return router;
}
