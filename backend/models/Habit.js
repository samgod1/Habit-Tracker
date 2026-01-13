import mongoose from "mongoose";

const habitSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["good", "bad"],
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		completedDates: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
