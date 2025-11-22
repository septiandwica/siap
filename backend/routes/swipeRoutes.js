// routes/swipeRoutes.js
import express from "express";
import {
    getAllSwipesSummary,
    getSwipesByUser,
    getSwipeByTarget,
    addSwipe,
    deleteSwipe,
} from "../controllers/swipeController.js";
import {
    getMatchesSummary,
    rebuildAllMatches,
} from "../controllers/matchController.js";

export default function (db) {
    const router = express.Router();

    router.get("/", (req, res) => getAllSwipesSummary(req, res, db));
    router.get("/matches/summary", (req, res) => getMatchesSummary(req, res, db));
    router.get("/rebuild-matches", (req, res) => rebuildAllMatches(req, res, db));
    router.get("/:uid/:targetId", (req, res) => getSwipeByTarget(req, res, db));
    router.get("/:uid", (req, res) => getSwipesByUser(req, res, db));
    router.delete("/:fromUid/:toUid", (req, res) => deleteSwipe(req, res, db));
    router.post("/", (req, res) => addSwipe(req, res, db));

    return router;
}
