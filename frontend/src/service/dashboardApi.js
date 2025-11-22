// src/service/dashboardApi.js
import axios from "axios";

export const dashboardApi = {
    getSummary: async () => {
        const res = await axios.get("http://localhost:2005/api/dashboard/summary");
        return res.data;
    },
};
