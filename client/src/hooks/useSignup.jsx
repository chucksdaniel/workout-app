import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const { dispatch } = useAuthContext();

	const signup = async (username, email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("/api/v1/auth/register", {
			method: "POST",
			body: JSON.stringify(username, email, password),
			headers: { "Content-Type": "application/json" },
		});
		const res = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(res.error);
		}
		if (response.ok) {
			// Save the user to local storage
			localStorage.setItem("user", JSON.stringify(res.data));

			//Update the auth context
			dispatch({ type: "LOGIN", payload: res });
			setIsLoading(false);
		}
	};
	return { signup, isLoading, error };
};
