import {
	FirstTimeInput,
	FirstTimeInputEmpresaDto,
	FirstTimeInputIngresarGuiaViajeForm,
} from "./classes";
import EditIcon from '@mui/icons-material/Edit';


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
	{ field: "matricula", headerName: "Matricula", width: 120 },
	{ field: "marcaVehiculo", headerName: "Marca", width: 120 },
	{ field: "modelo", headerName: "Modelo", width: 120 },
	{ field: "capacidad", headerName: "Capacidad", width: 120 },
	{ field: "peso", headerName: "Peso", width: 120 },
	{ field: "vencimientoITV", headerName: "ITV Venc.", width: 120 },
	{
		field: "permisoCirculacionNumero",
		headerName: "Nº Permiso",
		width: 120,
		valueGetter: params => params.row.permisoCirculacion.numero,
	},
	{
		field: "permisoCirculacionFechaEmision",
		headerName: "Emision Permiso",
		width: 120,
		valueGetter: params => params.row.permisoCirculacion.fechaEmision,
	},
	{
		field: "permisoCirculacionFechaVencimiento",
		headerName: "Venc. Permiso",
		width: 120,
		valueGetter: params => params.row.permisoCirculacion.fechaVencimiento,
	},
	{
		field: 'actions',
		headerName: '',
		width: 20,
		renderCell: (params) => {
		  return (
			  <EditIcon className="edit-icon"/>
		  );
		},
	  },
];

export const columnsEmpresas = [
	{ field: "nombre", headerName: "Nombre", width: 150 },
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
