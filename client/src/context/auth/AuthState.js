import { useReducer, useEffect } from "react";
import AuthContext from "./AuthContext";
import { authReducer } from "./AuthReducer";

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });
	console.log("AuthContext state", state);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user) {
         dispatch({type: "LOGIN", payload: user})
      }
   }, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
