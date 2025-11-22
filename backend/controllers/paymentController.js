// GET all payments
export const getAllPayments = async (req, res, db) => {
    try {
        const snapshot = await db.ref("PaymentId").once("value");
        const data = snapshot.val() || {};

        const result = [];

        Object.keys(data).forEach(uid => {
            const userPayments = data[uid];
            Object.keys(userPayments).forEach(paymentId => {
                result.push({
                    id: paymentId,
                    uid,
                    ...userPayments[paymentId]
                });
            });
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET payments by UID
export const getPaymentsByUid = async (req, res, db) => {
    const { uid } = req.params;

    try {
        const snapshot = await db.ref(`PaymentId/${uid}`).once("value");
        const data = snapshot.val() || {};

        const result = Object.keys(data).map(paymentId => ({
            id: paymentId,
            uid,
            ...data[paymentId]
        }));

        if (result.length === 0) {
            return res.status(404).json({ message: "No payments found for this user" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE new payment
export const createPayment = async (req, res, db) => {
    const { uid, external_id } = req.body;

    if (!uid || !external_id) {
        return res.status(400).json({ message: "uid & external_id are required" });
    }

    try {
        const paymentId = db.ref().push().key;

        const data = {
            uid,
            external_id,
            createdAt: Date.now()
        };

        await db.ref(`PaymentId/${uid}/${paymentId}`).set(data);

        res.status(201).json({ message: "Payment created", id: paymentId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE payment
export const updatePayment = async (req, res, db) => {
    const { uid, paymentId } = req.params;
    const updates = req.body;

    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
        return res.status(400).json({ message: "Request body must be an object with fields to update" });
    }

    try {
        const exists = await db.ref(`PaymentId/${uid}/${paymentId}`).once("value");
        if (!exists.val()) {
            return res.status(404).json({ message: "Payment not found" });
        }

        await db.ref(`PaymentId/${uid}/${paymentId}`).update(updates);

        res.status(200).json({ message: "Payment updated", updates });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// DELETE payment
export const deletePayment = async (req, res, db) => {
    const { uid, paymentId } = req.params;

    try {
        await db.ref(`PaymentId/${uid}/${paymentId}`).remove();
        res.status(200).json({ message: "Payment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
