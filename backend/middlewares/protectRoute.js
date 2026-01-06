import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function protectRoute(req, res, next) {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(400).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById({ _id: decoded.id }).select("-password");
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (e) {
		console.log(e);
		res.status(401).json({ message: "Unauthorized: Invalid Token" });
	}
}

export default protectRoute;
