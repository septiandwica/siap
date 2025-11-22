// controllers/swipeController.js
export const getAllSwipesSummary = async (req, res, db) => {
  try {
    const snapshot = await db.ref("SwipeList").once("value");
    const allSwipes = snapshot.val() || {};

    let totalSwipes = 0;
    const details = {};
    const daily = {};

    Object.entries(allSwipes).forEach(([userId, targets]) => {
      const userSwipeCount = Object.keys(targets || {}).length;
      details[userId] = userSwipeCount;
      totalSwipes += userSwipeCount;

      // Aggregate by date
      Object.values(targets || {}).forEach((swipe) => {
        if (swipe.timestamp) {
          const date = new Date(swipe.timestamp);
          const dateKey = date.toISOString().split("T")[0];
          daily[dateKey] = (daily[dateKey] || 0) + 1;
        }
      });
    });

    res.status(200).json({ totalSwipes, details, daily });
  } catch (error) {
    console.error("Error fetching total swipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /swipe/:uid
export const getSwipesByUser = async (req, res, db) => {
  try {
    const { uid } = req.params;
    const snapshot = await db.ref(`SwipeList/${uid}`).once("value");
    const swipes = snapshot.val() || {};
    res.status(200).json(swipes);
  } catch (error) {
    console.error("Error fetching swipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /swipe/:uid/:targetId
export const getSwipeByTarget = async (req, res, db) => {
  try {
    const { uid, targetId } = req.params;
    const snapshot = await db.ref(`SwipeList/${uid}/${targetId}`).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Swipe not found" });
    }

    res.status(200).json(snapshot.val());
  } catch (error) {
    console.error("Error fetching swipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /swipe
export const addSwipe = async (req, res, db) => {
  try {
    const { fromUid, toUid, status } = req.body;

    if (!fromUid || !toUid || !status) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const swipeRef = db.ref(`SwipeList/${fromUid}/${toUid}`);
    const newSwipe = {
      id: toUid,
      status,
      timestamp: Date.now(),
    };

    await swipeRef.set(newSwipe);

    let matchCreated = null;

    // If Like → check reverse swipe
    if (status === "Like") {
      const oppositeSnap = await db.ref(`SwipeList/${toUid}/${fromUid}`).once("value");
      if (oppositeSnap.exists() && oppositeSnap.val().status === "Like") {
        const matchId = [fromUid, toUid].sort().join("_");
        const matchRef = db.ref(`Matches/${matchId}`);

        const matchSnap = await matchRef.once("value");
        if (!matchSnap.exists()) {
          const matchData = {
            users: [fromUid, toUid],
            matchedAt: Date.now(),
          };
          await matchRef.set(matchData);
          matchCreated = matchData;
        }
      }
    }

    res.status(201).json({
      message: matchCreated ? "Swipe saved — It's a MATCH! 🎉" : "Swipe saved",
      data: newSwipe,
      match: matchCreated,
    });
  } catch (error) {
    console.error("Error saving swipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /swipe/:fromUid/:toUid
export const deleteSwipe = async (req, res, db) => {
  try {
    const { fromUid, toUid } = req.params;

    if (!fromUid || !toUid) {
      return res.status(400).json({ error: "Missing fromUid or toUid parameter" });
    }

    const swipeRef = db.ref(`SwipeList/${fromUid}/${toUid}`);
    const swipeSnap = await swipeRef.once("value");

    if (!swipeSnap.exists()) {
      return res.status(404).json({ error: "Swipe not found" });
    }

    await swipeRef.remove();

    res.status(200).json({
      message: "Swipe deleted successfully",
      fromUid,
      toUid,
    });
  } catch (error) {
    console.error("Error deleting swipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
