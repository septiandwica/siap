// routes/matchRoutes.js
import express from "express";
import {
    rebuildAllMatches,
    getMatchesSummary,
    deleteMatch,
} from "../controllers/matchController.js";

export default function (db) {
    const router = express.Router();

    router.get("/rebuild", (req, res) => rebuildAllMatches(req, res, db));
    router.get("/summary", (req, res) => getMatchesSummary(req, res, db));
    router.delete("/:matchId", (req, res) => deleteMatch(req, res, db));

    return router;
}
