import { useState, useContext, createContext } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export const AuthProvider = ({ children }) => {
	const alreadyLogged = cookies.get("code") !== undefined; // If the jwt is undefined, the user is not logged
	const initialUser = alreadyLogged
		? jwt_decode(cookies.get("code")).iss === "Encargado"
			? 1
			: 2
		: 0;

	const [isAuthenticated, setIsAuthenticated] = useState(alreadyLogged);
	const [user, setUser] = useState(initialUser);

	const login = code => {
		const jwtDecoded = jwt_decode(code);
		cookies.set("code", code);
		setIsAuthenticated(true);

		if (jwtDecoded.iss === "Encargado") {
			setUser(1);
		} else if (jwtDecoded.iss === "Funcionario") {
			setUser(2);
		}
	};

	const logout = () => {
		cookies.remove("code");
		setIsAuthenticated(false);
		setUser(0);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
