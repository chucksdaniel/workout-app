import React, { useEffect } from "react";

import "./style.css";

//Componets
import WorkoutDetails from "../../components/workout-details/WorkoutDetails";
import WorkoutForm from "../../components/work-form/WorkoutForm";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("/api/v1/workouts");
			const res = await response.json();

			if (response.ok) {
				// console.log(data);
				dispatch({ type: "SET_WORKOUTS", payload: res.data });
			}
		};
		fetchWorkouts();
	}, [dispatch]);
	console.log("Workouts ");
	console.log(workouts);
	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
