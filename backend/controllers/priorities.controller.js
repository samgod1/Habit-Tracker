import Priorities from "../models/Priorities.js";

export const getPriorites = async (req, res) => {
	try {
		const { _id } = req.user;

		const priorities = await Priorities.findOne({ userId: _id });
		console.log(priorities);

		if (!priorities) {
			const newPriorities = await Priorities.create({
				userId: _id,
				priorities: {
					1: "",
					2: "",
					3: "",
				},
			});
			return res.status(200).json(newPriorities.priorities);
		}

		return res.status(200).json(priorities);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops! Something went wrong" });
	}
};

export const updatePriorities = async (req, res) => {
	try {
		const { _id } = req.user;
		const { priorities } = req.body;

		await Priorities.findOneAndUpdate({ userId: _id }, { priorities });

		return res.status(200).json({ message: "Updated priorities successfully" });
	} catch (e) {
		console.log(e);
		return res.status(500).json("Oops! Something went wrong");
	}
};
