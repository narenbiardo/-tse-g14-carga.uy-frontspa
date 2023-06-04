import { useState, useContext, createContext } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { ErrorModalPublicUser } from "../Utilities/Error/ErrorModalPublicUser";

export const AuthContext = createContext();

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export const AuthProvider = ({ children }) => {
	const alreadyLogged = cookies.get("code") !== undefined; // If the jwt is undefined, the user is not logged
	//console.log(cookies.get("code"));
	const initialUser = alreadyLogged
		? jwt_decode(cookies.get("code")).rol[0] === "EncargadoEmpresa"
			? 1 // Encargado
			: jwt_decode(cookies.get("code")).rol[0] === "Funcionario"
			? 2 // Funcionario
			: 0 // Publico
		: 3; // Not logged

	const [isAuthenticated, setIsAuthenticated] = useState(alreadyLogged);
	const [user, setUser] = useState(initialUser);

	const login = code => {
		const jwtDecoded = jwt_decode(code);
		cookies.set("code", code);
		setIsAuthenticated(true);

		if (jwtDecoded.rol[0] === "EncargadoEmpresa") {
			setUser(1);
		} else if (jwtDecoded.rol[0] === "Funcionario") {
			setUser(2);
		} else {
			setUser(0);
		}
	};

	const logout = () => {
		cookies.remove("code");
		setIsAuthenticated(false);
		setUser(0);
	};

	return (
		<>
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
			<ErrorModalPublicUser user={user} /*When user is Publico*/ />
		</>
	);
};
