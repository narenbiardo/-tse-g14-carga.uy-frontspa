import cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const PerfilEmpresa = () => {
	const jwtDecoded = jwt_decode(cookies.get("code"));
	return (
		<>
			<h4>Número de empresa: {jwtDecoded.nroEmpresa}</h4>
		</>
	);
};
