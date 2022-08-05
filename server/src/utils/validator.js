const Joi = require("joi");

/** User validation section */
const validateUserSchema = Joi.object({
	username: Joi.string().alphanum().min(5).max(30).required(),
	password: Joi.string().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
});

const validateSignup = async (user) => {
	try {
		const value = await validateUserSchema.validateAsync(user);
		return value;
	} catch (error) {
		throw new Error(error.message || "Validation error");
	}
};

const validateLoginSchema = Joi.object({
	userIdentifier: Joi.string().required(),
	password: Joi.string().required(),
});

const validateLogin = async (user) => {
	try {
		const value = await validateLoginSchema.validateAsync(user);
		return value;
	} catch (error) {
		throw new Error(error.message || "Validation error");
	}
};

/** Workout validation section */

const validateWorkoutSchema = Joi.object({
	title: Joi.string().required(),
	load: Joi.number().required(),
	reps: Joi.number().required(),
});

const validateWorkout = async (product) => {
	try {
		const value = await validateWorkoutSchema.validateAsync(product);
		return value;
	} catch (error) {
		throw new Error(error.message || "Validation error");
	}
};

module.exports = {
	validateSignup,
	validateLogin,
	validateWorkout,
};
