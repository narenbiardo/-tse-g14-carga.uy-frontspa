import axios from "axios";
import cookies from "js-cookie";
import { serverURL } from "../constants";

export const axiosHeadersAuth = () =>
	(axios.defaults.headers.common["Authorization"] = cookies.get("code")
		? `Bearer ${cookies.get("code")}`
		: "");
export const axiosHeadersAccept = () =>
	(axios.defaults.headers.common["Accept"] = "*/*");

export const RESTEndpoints = {
	vehiculosService: {
		listaMarcasVehiculos:
			serverURL + "api/vehiculosService/listaMarcasVehiculos",
		agregarVehiculo: serverURL + "api/vehiculosService/agregarVehiculo",
		listarVehiculos: serverURL + "api/vehiculosService/listarVehiculos",
		editarVehiculo: serverURL + "api/vehiculosService/modVehiculo",
	},
	encargadoService: {
		getEmpresa: serverURL + "api/encargadoService/getEmpresa",
	},
};

/*	GET request example
axios
	.get("<URL>")
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});

	POST request example
axios
	.post("<URL>", {
		firstName: "John",
		lastName: "Doe",
	})
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});
*/
