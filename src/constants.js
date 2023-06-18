import {
	FirstTimeInput,
	FirstTimeInputEmpresaDto,
	FirstTimeInputIngresarGuiaViajeForm,
} from "./classes";

export const serverURL = "http://localhost:8080/";

export const mainColor = "#16b7b9";
export const dark = "#212529";

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

export const columnsVehiculos = [
	{ field: "matricula", headerName: "Matricula", width: 100 },
	{ field: "marca", headerName: "Marca", width: 150 },
	{ field: "modelo", headerName: "Modelo", width: 100 },
];

export const columnsGuiasDeViaje = [
	{ field: "id", headerName: "Id", width: 10 },
	{ field: "rubro", headerName: "Rubro", width: 150 },
	{ field: "kmOrigen", headerName: "Km Origen", width: 100 },
	{ field: "kmDestino", headerName: "Km Destino", width: 100 },
	{ field: "fecha", headerName: "Fecha", width: 90 },
	{ field: "hora", headerName: "Hora", width: 80 },
];

export const columnsChoferes = [
	{ field: "id", headerName: "Id", width: 10 },
	{ field: "nombre", headerName: "Nombre", width: 150 },
];

export const columnsVehiculosFull = [
	{ field: "matricula", headerName: "Matricula", width: 90 },
	{ field: "marcaVehiculo", headerName: "Marca", width: 110 },
	{ field: "modelo", headerName: "Modelo", width: 80 },
	{ field: "capacidad", headerName: "Capacidad", width: 70 },
	{ field: "peso", headerName: "Peso", width: 70 },
	{ field: "vencimientoITV", headerName: "ITV Venc.", width: 100 },
	{
		field: "permisoCirculacionNumero",
		headerName: "PC Nº",
		width: 10,
		valueGetter: params => params.row.permisoCirculacion.numero,
	},
	{
		field: "permisoCirculacionFechaEmision",
		headerName: "PC Emision",
		width: 100,
		valueGetter: params => params.row.permisoCirculacion.fechaEmision,
	},
	{
		field: "permisoCirculacionFechaVencimiento",
		headerName: "PC Venc.",
		width: 100,
		valueGetter: params => params.row.permisoCirculacion.fechaVencimiento,
	},
];

/*
const permisoCirculacion = new DtPermisoNacionalCirculacion(
	vehiculo.permisoCirculacion.numero,
	vehiculo.permisoCirculacion.fechaEmision,
	vehiculo.permisoCirculacion.fechaVencimiento
);

return new AgregarVehiculoForm(
	vehiculo.matricula,
	vehiculo.marcaVehiculo.nombre,
	vehiculo.modelo,
	vehiculo.capacidad.toString(),
	vehiculo.peso.toString(),
	permisoCirculacion,
	vehiculo.vencimientoITV
);
*/
