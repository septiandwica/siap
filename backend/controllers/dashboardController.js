export async function getDashboardSummary(req, res, db) {
    try {
        const usersSnap = await db.ref("Users").once("value");
        const swipeSnap = await db.ref("SwipeList").once("value");
        const matchSnap = await db.ref("Matches").once("value");

        const users = usersSnap.val() || {};
        const swipeList = swipeSnap.val() || {};
        const matches = matchSnap.val() || {};

        // ---- SUMMARY ----
        const totalUsers = Object.keys(users).length;
        
        // Count total swipes (nested structure: SwipeList/{userId}/{targetId})
        let totalSwipes = 0;
        Object.values(swipeList).forEach(userSwipes => {
            if (userSwipes && typeof userSwipes === 'object') {
                totalSwipes += Object.keys(userSwipes).length;
            }
        });
        
        const totalMatches = Object.keys(matches).length;

        // ---- DAILY DATA ----
        const swipeDaily = {};
        const matchDaily = {};

        // Process swipes from nested structure
        Object.values(swipeList).forEach(userSwipes => {
            if (userSwipes && typeof userSwipes === 'object') {
                Object.values(userSwipes).forEach(swipe => {
                    if (swipe && swipe.timestamp) {
                        const key = new Date(swipe.timestamp).toISOString().split("T")[0];
                        swipeDaily[key] = (swipeDaily[key] || 0) + 1;
                    }
                });
            }
        });

        // Process matches
        Object.values(matches).forEach(match => {
            if (match && match.matchedAt) {
                const key = new Date(match.matchedAt).toISOString().split("T")[0];
                matchDaily[key] = (matchDaily[key] || 0) + 1;
            }
        });

        return res.status(200).json({
            ok: true,
            summary: {
                totalUsers,
                totalSwipes,
                totalMatches,
                dailyMatches: matchDaily,
                dailySwipes: swipeDaily
            }
        });

    } catch (error) {
        console.error("Dashboard summary error:", error);
        return res.status(500).json({ ok: false, message: error.message });
    }
}
