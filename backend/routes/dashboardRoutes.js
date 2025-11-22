import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";

export default function (db) {
    const router = express.Router();

    router.get("/summary", (req, res) => getDashboardSummary(req, res, db));

    return router;
}
