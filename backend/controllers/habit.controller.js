import Habit from "../models/Habit.js";
import calculateStreak from "../utils/calculateStreak.js";

export const getAllHabits = async (req, res) => {
	try {
		const { _id } = req.user;

		const habits = await Habit.find({ userId: _id });

		return res.status(200).json(habits);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
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

		return res.status(200).json(newHabit);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const getCompletedDates = async (req, res) => {
	try {
		const habitId = req.params.id;
		const response = await Habit.findById(habitId).select("completedDates");

		const streak = calculateStreak(response.completedDates);

		return res
			.status(200)
			.json({ completedDates: response.completedDates, streak: streak });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const updateCompletedDates = async (req, res) => {
	try {
		const user = req.user;
		const { completedDates, habitId } = req.body;

		await Habit.findByIdAndUpdate(habitId, { completedDates: completedDates });

		const streak = calculateStreak(completedDates);

		return res
			.status(200)
			.json({ message: "Updated successfuly", streak: streak });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const editHabit = async (req, res) => {
	try {
		const id = req.params.id;
		const { icon, name, type } = req.body;

		const updatedHabit = await Habit.findOneAndUpdate(
			{ _id: id },
			{ icon: icon, name: name, type: type },
			{ new: true },
		);

		return res.status(200).json(updatedHabit);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
	}
};

export const deleteHabit = async (req, res) => {
	try {
		const habitId = req.params.id;

		await Habit.findOneAndDelete({ _id: habitId });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! something went wrong" });
	}
};
