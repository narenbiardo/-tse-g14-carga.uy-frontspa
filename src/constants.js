import {
	FirstTimeInput,
	FirstTimeInputEmpresaDto,
	FirstTimeInputIngresarGuiaViajeForm,
} from "./classes";

export const serverURL = "http://localhost:8080/";

export const mainColor = "#16b7b9";

export const fti = new FirstTimeInput( //used to check if the form input is changed for the first time in AgregarVehiculo and EditarVehiculo
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true
);

export const ftie = new FirstTimeInputEmpresaDto( //used to check if the form input is changed for the first time in EditarEmpresa
	true,
	true,
	true,
	true,
	true,
	true
);

export const ftiigv = new FirstTimeInputIngresarGuiaViajeForm(
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true,
	true
);
