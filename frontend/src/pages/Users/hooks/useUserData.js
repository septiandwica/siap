import { useEffect, useState } from "react";
import { getUsers } from "../../../service/userApi";

export default function useUserData() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
        try {
            const data = await getUsers();
            const arr = Object.keys(data || {}).map((k) => ({
            id: k,
            ...data[k],
            photo:
                data[k].photo === "googleusercontent"
                ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                : data[k].photo,
            }));

            setUsers(arr);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetch();
    }, []);

    return { users, setUsers, loading };
}
