import axios from "axios";
import cookies from "js-cookie";
import { serverURL } from "../constants";

export const axiosHeadersAuth = code =>
	(axios.defaults.headers.common["Authorization"] = cookies.get("code")
		? `Bearer ${code ? code : cookies.get("code")}`
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
		/*NEW*/ modEmpresa: serverURL + "api/encargadoService/modEmpresa",
		/*NEW*/ ingresarGuiaViaje:
			serverURL + "api/encargadoService/ingresarGuiaViaje",
		rubros: serverURL + "api/encargadoService/rubros",
		vehiculos: serverURL + "api/encargadoService/vehiculos",
		/*NEW*/ agregarVehiculo: serverURL + "api/encargadoService/agregarVehiculo",
		/*NEW*/ listarGuiasAsignables:
			serverURL + "api/encargadoService/listarGuiasAsignables",
		/*NEW*/ listarVehiculos: serverURL + "api/encargadoService/listarVehiculos",
		/*NEW*/ modVehiculo: serverURL + "api/encargadoService/modVehiculo",
		/*NEW*/ eliminarVehiculo:
			serverURL + "api/encargadoService/eliminarVehiculo/",
		/*NEW*/ listarChoferes: serverURL + "api/encargadoService/listarChoferes/",
		/*NEW*/ asignarGuiaViaje:
			serverURL + "api/encargadoService/asignarGuiaViaje/",
	},
	guiasViajesService: {
		listarGuiasAsignables:
			serverURL + "api/guiasViajesService/listarGuiasAsignables",
	},
	publicService: {
		/*NEW*/ listaMarcasVehiculos:
			serverURL + "api/publicService/listaMarcasVehiculos",
		/*NEW*/ rubros: serverURL + "api/publicService/rubros",
		/*NEW*/ validarEmpresas: serverURL + "api/publicService/validarEmpresas",
		/*NEW*/ viajesEnCurso: serverURL + "api/publicService/viajesEnCurso",
		/*NEW*/ choferesRegistrados:
			serverURL + "api/publicService/choferesRegistrados",
	},
	funcionarioService: {
		/*NEW*/ addEmpresa: serverURL + "api/funcionarioService/addEmpresa",
		/*NEW*/ listEmpresas: serverURL + "api/funcionarioService/listEmpresas",
		/*NEW*/ modEmpresa: serverURL + "api/funcionarioService/modEmpresa",
		/*NEW*/ delEmpresa: serverURL + "api/funcionarioService/delEmpresa/",
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
