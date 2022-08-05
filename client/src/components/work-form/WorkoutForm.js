import React, { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

import "./style.css";

function WorkoutForm() {
	const { dispatch } = useWorkoutsContext();

	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workout = { title, load, reps };

		const response = await fetch("/api/v1/workouts", {
			method: "POST",
			body: JSON.stringify(workout), // Changes the workout into a json strings
			headers: {
				"Content-Type": "application/json",
			},
		});

		const res = await response.json();

		if (!response.ok) {
			setError(res.error);
			setEmptyFields(res.emptyFields);
		}
		if (response.ok) {
			setError(null);
			setTitle("");
			setLoad("");
			setReps("");
			setEmptyFields([]);
			console.log("New workout", res.data);
			dispatch({ type: "CREATE_WORKOUT", payload: res.data });
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h4>Add a new workout</h4>

			<label>Exercise Title: </label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes("title") ? "error" : ""}
			/>
			<label>Load (in kg): </label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes("load") ? "error" : ""}
			/>
			<label>Reps: </label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<button>Add workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
}

export default WorkoutForm;
