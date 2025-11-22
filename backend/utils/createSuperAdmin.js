import bcrypt from "bcrypt";
import { db } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

export async function createSuperAdmin() {
    const uid = uuidv4();
    const password = "superadmin123";

    const hash = await bcrypt.hash(password, 10);

    const data = {
        uid,
        email: "superadmin@siapnikah.com",
        name: "Super Admin",
        role: "superadmin",
        password: hash,
        createdAt: Date.now()
    };

    await db.ref("Users").child(uid).set(data);

    console.log("Superadmin created! UID:", uid);
}
