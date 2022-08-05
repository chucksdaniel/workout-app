const router = require("express").Router();

const workoutRoute = require("./v1/workout");
const authRoute = require("./v1/auth");

router.use("/v1/workouts", workoutRoute);
router.use("/v1/auth", authRoute);

module.exports = router;
