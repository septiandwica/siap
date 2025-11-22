import express from "express";
import { getSubscriptions } from "../controllers/subscriptionController.js";

export default function (db) {
    const router = express.Router();
    router.get("/", (req, res) => getSubscriptions(req, res, db));
    return router;
}
