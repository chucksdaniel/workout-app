import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signup, isLoading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log(username, email, password);
		await signup({username, email, password});
      
      setUsername('')
      setEmail("")
      setPassword("")
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h4>Signup</h4>
			<label>Username: </label>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<label>Email: </label>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<label>Password: </label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
            />
			<button disabled={isLoading}>Signup</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
