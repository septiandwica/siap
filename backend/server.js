import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swipeRoutes from "./routes/swipeRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import superRoutes from "./routes/superRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { db } from "./config/firebase.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://admin-panel.siapnikah.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "uid", "role", "x-uid", "x-role"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/dashboard", dashboardRoutes(db));
app.use("/api/users", userRoutes(db));
app.use("/api/swipe", swipeRoutes(db));
app.use("/api/match", matchRoutes(db));
app.use("/api/admins", adminRoutes(db));
app.use("/super", superRoutes(db));
app.use("/auth", authRoutes(db));
app.use("/api/subscription", subscriptionRoutes(db));
app.use("/api/payments", paymentRoutes(db))

const PORT = process.env.PORT || 2025;
app.listen(PORT, () =>
  console.log(`✅ Server running on`)
);
