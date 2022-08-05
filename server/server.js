const express = require("express");
const dotevn = require("dotenv");

const connectDB = require("./src/database/db");
const indexRoute = require("./src/routes");

dotevn.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api", indexRoute);

/** Error handler middleware */
app.use((req, res, next) => {
	const error = new Error();
	error.name = "Not found";
	error.status = 404;
	error.message = "Route not found, Please try a valid endpoint";
	next(error);
});

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMsg = err.message || "Something went wrong";

	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMsg,
		stack: err.stack,
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
