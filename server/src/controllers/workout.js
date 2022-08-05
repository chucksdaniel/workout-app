const mongoose = require("mongoose");
const Workout = require("../database/models/Workout");
const { createError } = require("../utils/errorHandler");
const { validateWorkout } = require("../utils/validator");

exports.createWorkout = async (req, res, next) => {
	const { title, reps, load } = req.body;

	// const workoutData = req.body;

	/** Error handler */
	const emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}

	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all the fields", emptyFields });
	}

	try {
		// const validWorkout = await validateWorkout(workoutData);

		// const newWorkout = new Workout(validWorkout);
		const newWorkout = await Workout.create({ title, reps, load });
		// const workout = await newWorkout.save();
		res.status(201).json({
			success: true,
			message: "Workout created successfully",
			data: newWorkout,
		});
	} catch (error) {
		// res.status(400).json({ error: error.message });
		next(error);
	}
};

exports.getWorkouts = async (req, res, next) => {
	try {
		const workouts = await Workout.find({}).sort({ createdAt: -1 });
		res.status(200).json({
			success: true,
			message: "Workouts fetched successfully",
			data: workouts,
		});
	} catch (error) {
		next(error);
	}
};

exports.getWorkout = async (req, res, next) => {
	const { workoutId } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(workoutId)) {
			next(createError(400, "Workout not found"));
			return;
		}

		const workout = await Workout.findById(workoutId);

		if (!workout) {
			next(createError(404, "Workout not found"));
			return;
		}

		res.status(200).json({
			success: true,
			message: "Workout retrieved successfully",
			data: workout,
		});
	} catch (error) {
		next(error);
	}
};

exports.editWorkout = async (req, res, next) => {
	const { workoutId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(workoutId)) {
		next(createError(400, "Workout not found"));
		return;
	}

	try {
		const updateWorkout = await Workout.findOneAndUpdate(
			{ _id: workoutId },
			{ ...req.body },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: "Workout updated successfully",
			data: updateWorkout,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteWorkout = async (req, res, next) => {
	const { workoutId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(workoutId)) {
		next(createError(400, "Workout not found"));
		return;
	}
	try {
		const workout = await Workout.findOneAndDelete({ _id: workoutId });
		res.status(200).json({
			success: true,
			message: "Workout deleted successfully",
			data: workout,
		});
	} catch (error) {
		next(error);
	}
};
