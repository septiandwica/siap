// GET user
export const getUsers = async (req, res, db) => {
    try {
        const snapshot = await db.ref("Users").once("value");
        const users = snapshot.val() || {};
        console.log("📥 Data dari Firebase:", users);
        res.status(200).json(users);
    } catch (err) {
        console.error("❌ Error getUsers:", err);
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
};

// GET user by uid
export const getUserByUid = async (req, res, db) => {
    try {
        const { uid } = req.params;
        const snapshot = await db.ref("Users").child(uid).once("value");
        const user = snapshot.val();

        if (!user) {
        return res.status(404).json({ message: `User with UID ${uid} not found` });
        }

        console.log(`📥 Data user ${uid}:`, user);
        res.status(200).json(user);
    } catch (err) {
        console.error("❌ Error getUserByUid:", err);
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
};

// ADD user
export const addUser = async (req, res, db) => {
    try {
        const { nickname, birthDay, gender, email, phone } = req.body;

        // Default values
        const defaultData = {
            blurOption: true,
            createDate: Date.now(),
            defaultDateSpecialLike: Date.now(),
            defaultDateSpecialLikeGold: Date.now(),
            defaultDateSpecialLikePlatiinum: Date.now(),
            defaultDateSwipe: Date.now(),
            defaultDateSwipeGold: Date.now(),
            defaultDateSwipePlatiinum: Date.now(),
            defaultDistance: 50,
            defaultSpecialLike: 1,
            defaultSpecialLikeGold: 5,
            defaultSpecialLikePlatinum: 10,
            defaultSwipe: 0,
            defaultSwipeGold: 100,
            defaultSwipePlatinum: 250,
            lastLogin: Date.now(),
            latitude: "",
            longitude: "",
            seekBarValue: 180,
            stepProfile: 1,
            status: "online",
            photo: "",
        };

        const newUser = {
        ...defaultData,
            nickname: nickname || "",
            birthDay: birthDay || "",
            gender: gender || "",
            email: email || "",
            phone: phone || "",
            uid: db.ref("Users").push().key,
        };

        const cleanUser = Object.fromEntries(Object.entries(newUser).filter(([_, v]) => v !== undefined));

        await db.ref("Users").child(cleanUser.uid).set(cleanUser);

        console.log("✅ User ditambahkan:", cleanUser);
        res.status(201).json({ message: "User added successfully", user: cleanUser });
    } catch (err) {
        console.error("❌ Error addUser:", err);
        res.status(500).json({ message: "Failed to add user", error: err.message });
    }
};

// UPDATE user
export const updateUser = async (req, res, db) => {
    try {
        const uid = req.params.uid;
        const updatedData = req.body;

        await db.ref("Users").child(uid).update(updatedData);

        res.status(200).json({ message: `User ${uid} updated successfully!` });
    } catch (error) {
        console.error("❌ Error updateUser:", error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE user
export const deleteUser = async (req, res, db) => {
    try {
        const uid = req.params.uid;

        await db.ref("Users").child(uid).remove();

        res.status(200).json({ message: `User ${uid} deleted successfully!` });
    } catch (error) {
        console.error("❌ Error deleteUser:", error);
        res.status(500).json({ error: error.message });
    }
};
