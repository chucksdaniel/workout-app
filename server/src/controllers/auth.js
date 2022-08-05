const User = require("../database/models/User");
const validator = require("../utils/validator");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		// const validData = validator.validateSignup({ username, email, password });
		const user = await User.signup(username, email, password);

		res.status(201).json({
			success: true,
			email,
			message: "User signup successfully",
			data: user,
		});
	} catch (error) {
		// next(error);
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res, next) => {
	res.send("Login user route");
};
