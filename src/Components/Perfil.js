import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useAuth } from "../Services/useAuth";

export const Perfil = () => {
	const { user } = useAuth();
	const jwtDecoded = jwt_decode(cookies.get("code"));
	return (
		<>
			<h4>Rol: {user === 1 ? "Encargado" : "Funcionario"}</h4>
			<h4>Nombre: {jwtDecoded.iss}</h4>
			<h4>Email: {jwtDecoded.email}</h4>
			<h4>Cédula: {jwtDecoded.cedula}</h4>
		</>
	);
};
