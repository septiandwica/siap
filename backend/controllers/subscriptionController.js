// GET /api/subscription
export const getSubscriptions = async (req, res, db) => {
    try {
        const snapshot = await db.ref("Subscription").once("value");
        const data = snapshot.val() || {};

        const result = Object.keys(data).map(id => ({
            id,
            ...data[id]
        }));

        if (result.length === 0) {
            return res.status(404).json({ message: "No subscriptions found" });
        }

        res.status(200).json(result);

    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: error.message });
    }
};
