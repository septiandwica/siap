import express from "express";
import {
    getAllPayments,
    getPaymentsByUid,
    createPayment,
    updatePayment,
    deletePayment
} from "../controllers/paymentController.js";

export default function (db) {
    const router = express.Router();

    router.get("/", (req, res) => getAllPayments(req, res, db));
    router.get("/:uid", (req, res) => getPaymentsByUid(req, res, db));
    router.post("/", (req, res) => createPayment(req, res, db));
    router.put("/:uid/:paymentId", (req, res) => updatePayment(req, res, db));
    router.delete("/:uid/:paymentId", (req, res) => deletePayment(req, res, db));

    return router;
}
