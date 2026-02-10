import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import habitRoutes from "./routes/habit.route.js";
import prioritiesRoutes from "./routes/priorities.route.js";
import protectRoute from "./middlewares/protectRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

app.set("trust proxy", 1);
app.use("/api/auth", authRoutes);
app.use("/api/user", protectRoute, userRoutes);
app.use("/api/habit", protectRoute, habitRoutes);
app.use("/api/priorities", protectRoute, prioritiesRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use("/{*any}", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
	connectToDB();
	console.log("App is running on port: " + PORT);
});
