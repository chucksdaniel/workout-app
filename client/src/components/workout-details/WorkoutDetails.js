import React from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import "./style.css";

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutsContext();
	const handleDelete = async () => {
		alert("Are you sure you want to Delete workout");
		const response = await fetch(`/api/v1/workouts/${workout._id}`, {
			method: "DELETE",
		});
		const res = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: res.data });
		}
	};
	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Reps: </strong>
				{workout.reps}
			</p>
			<p>
				{formatDistanceToNow(new Date(workout.createdAt), {
					addSuffix: true,
				})}
			</p>
			<span className="material-symbols-outlined" onClick={handleDelete}>
				Delete
			</span>
		</div>
	);
};

export default WorkoutDetails;
