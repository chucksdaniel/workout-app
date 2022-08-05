const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: String,
		email: String,
		password: String,
	},
	{ timestamps: true }
);

// static signup method

UserSchema.statics.signup = async function (username, email, password) {
	if (!username) {
		throw Error("Username cannot be empty");
	}
	if (!email) {
		throw Error("Email is required");
	}
	if (!password) {
		throw Error("Password is required");
	}

	if (!validator.isEmail(email)) {
		throw Error("Email is not valid");
	}

	// if (!validator.isStrongPassword(password)) {
	// 	throw Error("Password not strong enough");
	// }

	const usernameExist = await this.findOne({ username });
	if (usernameExist) {
		throw Error("Username already in use by another user");
	}
	const emailExist = await this.findOne({ email });
	if (emailExist) {
		throw Error("Email already in use");
	}

	const salt = await bcrypt.genSalt(10);
	const hassPassword = await bcrypt.hash(password, salt);

	const user = await this.create({ username, email, password: hassPassword });
	return user;
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
