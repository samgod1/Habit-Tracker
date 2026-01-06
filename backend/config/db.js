import mongoose from "mongoose";

function connectToDB() {
	try {
		mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to database");
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}

export default connectToDB;
