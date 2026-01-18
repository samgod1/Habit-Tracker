import mongoose from "mongoose";

const prioritiesSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	priorities: {
		type: Object,
		required: true,
	},
});

const Priorities = mongoose.model("Priorities", prioritiesSchema);

export default Priorities;
