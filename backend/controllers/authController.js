import bcrypt from "bcrypt";

export const login = async (req, res, db) => {
    const { email, password } = req.body;

    try {
        const snapshot = await db.ref("Users")
            .orderByChild("email")
            .equalTo(email)
            .once("value");

        if (!snapshot.exists()) {
            return res.status(400).json({ message: "Email not found" });
        }

        const users = snapshot.val();
        const uid = Object.keys(users)[0];
        const user = users[uid];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login success",
            user: {
                uid: user.uid,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
