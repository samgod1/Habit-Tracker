export const getUser = async (req, res) => {
	try {
		const user = req.user;
		return res.status(200).json(user);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: "Oops something went wrong" });
	}
};
