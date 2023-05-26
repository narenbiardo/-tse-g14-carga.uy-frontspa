import { useState, useContext, createContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(0);

	const login = () => {
		setIsAuthenticated(true);
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
		setIsAuthenticated(false);
		setUser(0);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				loginEncargado,
				loginFuncionario,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
