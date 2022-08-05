const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../users/model/User");

dotenv.config();

exports.getAllUser = async () => {
	return UserModel.find();
};

exports.create = async ({ name, username, password, email }) => {
	const newUser = new UserModel({
		name,
		username,
		password,
		email: email.toLowerCase(),
	});
	const user = await newUser.save();

	const payload = {
		user: {
			id: user.id,
			role: user.role,
		},
	};

	const token = this.signToken(payload);

	return token;
};

exports.findByEmailOrUsername = async (userIdentifier) => {
	const user = await UserModel.findOne({
		$or: [
			{
				username: userIdentifier,
			},
			{
				email: userIdentifier,
			},
		],
	});

	return user;
};

exports.findByUsername = async (username) => {
	const user = await UserModel.findOne({ username });
	return user;
};

exports.findByEmail = async (email) => {
	const user = await UserModel.findOne({ email }).select("-password");
	return user;
};

exports.findById = async (id) => {
	const user = await UserModel.findById(id).select("-password -__v");
	return user;
};

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);

	const hash = await bcrypt.hash(password, salt);
	return hash;
};

exports.compareHash = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

exports.signToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
};

exports.validateToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};
