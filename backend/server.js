import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("hello world");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	connectToDB();
	console.log("App is running on port: " + PORT);
});
