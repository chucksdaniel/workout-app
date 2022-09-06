import React, { useState } from "react";

const Login = () => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(identifier, password);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h4>Signup</h4>
			<label>Username/Email: </label>
			<input
				type="text"
				onChange={(e) => setIdentifier(e.target.value)}
				value={identifier}
			/>

			<label>Password: </label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button>Log in</button>
		</form>
	);
};

export default Login;
