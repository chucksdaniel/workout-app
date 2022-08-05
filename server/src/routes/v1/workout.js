const router = require("express").Router();

const {
	getWorkout,
	getWorkouts,
	createWorkout,
	editWorkout,
	deleteWorkout,
} = require("../../controllers/workout");

router.route("/").get(getWorkouts).post(createWorkout);
router
	.route("/:workoutId")
	.get(getWorkout)
	.patch(editWorkout)
	.delete(deleteWorkout);

module.exports = router;
