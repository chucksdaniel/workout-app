const router = require("express").Router();

const {
	getWorkout,
	getWorkouts,
	createWorkout,
	editWorkout,
	deleteWorkout,
} = require("../../controllers/workout");
const { auth } = require("../../middleware/auth");

router.use(auth)

router.route("/").get(getWorkouts).post(createWorkout);
router
	.route("/:workoutId")
	.get(getWorkout)
	.patch(editWorkout)
	.delete(deleteWorkout);

module.exports = router;
