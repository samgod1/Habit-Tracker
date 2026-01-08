import bcrypt from "bcrypt";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		//Checking for empty inputs
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		//Checking if email exists
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		//Verifying password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const token = generateToken(user._id);

		res.cookie("token", token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		return res.status(200).json({ username: user.username, email: user.email });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const signup = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;

		//Checking for empty inputs
		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });

		//Checking if user already exists
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		//Checking if password matches confirm password
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords don't match" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			username: username,
			email: email,
			password: hashedPassword,
		});

		const token = generateToken(newUser._id);

		res.cookie("token", token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res
			.status(200)
			.json({ username: newUser.username, email: newUser.email });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const logout = (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
		});
		return res.status(200).json({ message: "Logout successful" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};
