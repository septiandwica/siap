// Rebuild all matches
export const rebuildAllMatches = async (req, res, db) => {
    try {
        const snapshot = await db.ref("SwipeList").once("value");
        const swipeList = snapshot.val() || {};
        const matches = [];
    
        for (const fromUid in swipeList) {
            const userSwipes = swipeList[fromUid];
            if (!userSwipes) continue;
    
            for (const toUid in userSwipes) {
            const swipe = userSwipes[toUid];
            const reverseSwipe = swipeList[toUid]?.[fromUid];
    
            if (swipe.status === "Like" && reverseSwipe?.status === "Like") {
                const matchId = [fromUid, toUid].sort().join("_");
    
                if (!matches.find((m) => m.matchId === matchId)) {
                const matchData = {
                    matchId,
                    users: [fromUid, toUid],
                    matchedAt: Math.min(swipe.timestamp, reverseSwipe.timestamp),
                };
    
                await db.ref(`Matches/${matchId}`).set(matchData);
                matches.push(matchData);
                }
            }
            }
        }
    
        res.status(200).json({
            message: "Match rebuilding complete",
            totalNewMatches: matches.length,
            matches,
        });
        } catch (error) {
        console.error("Error rebuilding matches:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

  // GET matches summary
export const getMatchesSummary = async (req, res, db) => {
    try {
        const snapshot = await db.ref("Matches").once("value");
        const matchesData = snapshot.val() || {};
    
        const matchList = Object.entries(matchesData).map(([matchId, match]) => ({
            matchId,
            users: match.users || [],
            matchedAt: match.matchedAt || null,
        }));
    
        // Aggregate matches by date
        const daily = {};
        matchList.forEach((match) => {
            if (match.matchedAt) {
            const date = new Date(match.matchedAt);
            const dateKey = date.toISOString().split("T")[0];
            daily[dateKey] = (daily[dateKey] || 0) + 1;
            }
        });
    
        res.status(200).json({
            totalMatches: matchList.length,
            matches: matchList,
            daily,
        });
    } catch (error) {
        console.error("Error fetching match summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

  // DELETE match
export const deleteMatch = async (req, res, db) => {
    try {
        const { matchId } = req.params;
    
        if (!matchId) {
            return res.status(400).json({ error: "Missing matchId parameter" });
        }
    
        const matchRef = db.ref(`Matches/${matchId}`);
        const matchSnap = await matchRef.once("value");
    
        if (!matchSnap.exists()) {
            return res.status(404).json({ error: "Match not found" });
        }
    
        await matchRef.remove();
    
        res.status(200).json({
            message: "Match deleted successfully",
            matchId,
        });
        } catch (error) {
        console.error("Error deleting match:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
