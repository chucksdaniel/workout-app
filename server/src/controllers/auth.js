const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const { signToken } = require("../utils/helper");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.signup(username, email, password);

		const payload = {
			id: user._id,
		};

		const token = signToken(payload);

		res.status(201).json({
			success: true,
			username,
			message: "User signup successfully",
			data: token,
		});
	} catch (error) {
		// next(error);
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res, next) => {
	const { userIdentifier, password } = req.body;

	try {
		const user = await User.login(userIdentifier, password);

		const payload = {
			id: user._id,
		};

		const token = signToken(payload);

		res.status(201).json({
			success: true,
			userIdentifier,
			message: "User logged in successfully",
			data: token,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
