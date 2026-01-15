import Habit from "../models/Habit.js";

export const getAllHabits = async (req, res) => {
	try {
		const { _id } = req.user;

		const habits = await Habit.find({ userId: _id });

		res.status(200).json(habits);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const createHabit = async (req, res) => {
	try {
		const { _id } = req.user;
		const { icon, name, type } = req.body;

		if (!icon || !name || !type) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newHabit = await Habit.create({
			userId: _id,
			name: name,
			type: type,
			icon: icon,
		});

		res.status(200).json(newHabit);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const getCompletedDates = async (req, res) => {
	try {
		const habitId = req.params.id;
		const response = await Habit.findById(habitId).select("completedDates");

		res.status(200).json({ completedDates: response.completedDates });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const updateCompletedDates = async (req, res) => {
	try {
		const user = req.user;
		const { completedDates, habitId } = req.body;

		await Habit.findByIdAndUpdate(habitId, { completedDates: completedDates });

		res.status(200).json({ message: "Updated successfuly" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: "Oops! something went wrong" });
	}
};
