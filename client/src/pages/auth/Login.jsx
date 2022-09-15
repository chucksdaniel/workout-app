import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");

   const {login, isLoading, error} = useLogin()

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(identifier, password);

      await login(identifier, password)
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h4>Login</h4>
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
			<button disabled={isLoading}> Log in</button>
         {error && <div className="error">{error}</div>}
		</form>
	);
};

export default Login;
