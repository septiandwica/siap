import axiosInstance from "./axiosInstance";

export const swipeApi = {
    // GET total swipes summary
    getAllSwipesSummary: async () => {
        const res = await axiosInstance.get("/swipe");
        return res.data;
    },

    // GET swipes by a specific user
    getSwipesByUser: async (uid) => {
        const res = await axiosInstance.get(`/swipe/${uid}`);
        return res.data;
    },

    // GET swipe detail (uid → targetId)
    getSwipeByTarget: async (uid, targetId) => {
        const res = await axiosInstance.get(`/swipe/${uid}/${targetId}`);
        return res.data;
    },

    // POST add swipe
    addSwipe: async (data) => {
        const res = await axiosInstance.post("/swipe", data);
        return res.data;
    },

    // GET matches summary
    getMatchesSummary: async () => {
        const res = await axiosInstance.get("/swipe/matches/summary");
        return res.data;
    },

    // GET rebuild matches
    rebuildMatches: async () => {
        const res = await axiosInstance.get("/swipe/rebuild-matches");
        return res.data;
    },
};
