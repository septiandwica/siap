import { db } from "../config/firebase.js";

export async function assignDefaultRole() {
    console.log("🚀 Starting assignDefaultRole...");

    const usersRef = db.ref("Users");
    const snapshot = await usersRef.once("value");

    if (!snapshot.exists()) {
        console.log("❌ No users found");
        return;
    }

    const updates = {};

    snapshot.forEach((child) => {
        const uid = child.key;

        console.log(`👉 Adding role for ${uid}`);

        updates[`${uid}/role`] = "user";
    });

    await usersRef.update(updates);

    console.log("🎉 All users updated with role = 'user'");
}
