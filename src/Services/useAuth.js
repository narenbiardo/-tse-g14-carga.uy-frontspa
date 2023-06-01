import { useState, useContext, createContext } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(0);

	const login = code => {
		cookies.set("code", code);
		setIsAuthenticated(true);
		setUser(1);
	};

	const loginEncargado = () => {
		setIsAuthenticated(true);
		setUser(1);
	};

	const loginFuncionario = () => {
		setIsAuthenticated(true);
		setUser(2);
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
				loginEncargado,
				loginFuncionario,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
