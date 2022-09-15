import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const { dispatch } = useAuthContext();

	const login = async (userIdentifier, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("/api/v1/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({userIdentifier, password}),
		});
		const res = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(res.error);
		}
		if (response.ok) {
			// Save the user to local storage
			localStorage.setItem("user", JSON.stringify(res));

			//Update the auth context
			dispatch({ type: "LOGIN", payload: res });
			setIsLoading(false);
		}
	};
	return { login, isLoading, error };
};
