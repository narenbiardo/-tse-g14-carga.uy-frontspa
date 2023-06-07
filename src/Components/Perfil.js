import cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const Perfil = () => {
	const jwtDecoded = jwt_decode(cookies.get("code"));
	return (
		<>
			<h4>Rol: {jwtDecoded.rol[1]}</h4>
			<h4>Nombre: {jwtDecoded.iss}</h4>
			<h4>Email: {jwtDecoded.email}</h4>
			<h4>Cédula: {jwtDecoded.cedula}</h4>
		</>
	);
};
