import {
	FirstTimeInput,
	FirstTimeInputEmpresaDto,
	FirstTimeInputIngresarGuiaViajeForm,
	FirstTimeInputAñadirEmpresaForm,
} from "./classes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export const serverURL = process.env.PORT ? "https://carga-uy-back.web.elasticloud.uy/" : "http://localhost:8080/" ;

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

export const ftiaef = new FirstTimeInputAñadirEmpresaForm( //used to check if the form input is changed for the first time in AñadirEmpresa
	true,
	true,
	true,
	true,
	true,
	true
);

export const columnsVehiculos = [
	{ field: "matricula", headerName: "Matricula", flex: 1 },
	{ field: "marca", headerName: "Marca", flex: 1 },
	{ field: "modelo", headerName: "Modelo", flex: 1 },
	{ field: "capacidad", headerName: "Capacidad", flex: 1 },
];

export const columnsGuiasDeViaje = [
	{ field: "id", headerName: "Id", flex: 1 },
	{ field: "rubro", headerName: "Rubro", flex: 1 },
	{ field: "origen", headerName: "Origen", flex: 1 },
	{ field: "destino", headerName: "Destino", flex: 1 },
	{ field: "fecha", headerName: "Fecha", flex: 1 },
	{ field: "hora", headerName: "Hora", flex: 1 },
	{ field: "estadoViaje", headerName: "Estado", flex: 1 },
	{ field: "volumenCarga", headerName: "Volumen Carga", flex: 1 },
	{
		field: "asignar",
		headerName: "",
		flex: 1,
		renderCell: params => (
			<Button variant="text" className="asignar-btn">
				ASIGNAR
			</Button>
		),
	},
];

export const columnsChoferes = [
	{ field: "nombre", headerName: "Nombre", flex: 1 },
	{ field: "apellido", headerName: "Apellido", flex: 1 },
	{ field: "cedula", headerName: "Cedula", flex: 1 },
	{ field: "email", headerName: "Email", flex: 1 },
	{ field: "vencimientoLicencia", headerName: "Venc. Licencia", flex: 1 },
];

export const columnsVehiculosFull = [
	{ field: "matricula", headerName: "Matricula", width: 110 },
	{ field: "marcaVehiculo", headerName: "Marca", width: 110 },
	{ field: "modelo", headerName: "Modelo", width: 110 },
	{ field: "capacidad", headerName: "Capacidad", width: 120 },
	{ field: "peso", headerName: "Peso", width: 110 },
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
		field: "edit",
		headerName: "",
		width: 8,
		renderCell: params => {
			return <EditIcon className="edit-icon" />;
		},
	},
	{
		field: "delete",
		headerName: "",
		width: 8,
		renderCell: params => {
			return <DeleteIcon className="delete-icon" />;
		},
	},
];

export const columnsVehiculosITV = [
	{ field: "nroEmpresa", headerName: "Nº Empesa", width: 90 },
	{ field: "nombreEmpresa", headerName: "Nombre Empesa", width: 120 },
	{ field: "matricula", headerName: "Matricula", width: 110 },
	{ field: "marcaVehiculo", headerName: "Marca", width: 110 },
	{ field: "modelo", headerName: "Modelo", width: 110 },
	{ field: "vencimientoITV", headerName: "ITV Venc.", width: 120 },
	{
		field: "edit",
		headerName: "",
		width: 8,
		renderCell: params => {
			return <EditIcon className="edit-icon" />;
		},
	},
];

export const columnsEmpresas = [
	{ field: "nombre", headerName: "Nombre", width: 150 },
];

export const columnsEmpresasFull = [
	{ field: "nroEmpresa", headerName: "Nº", width: 150 },
	{ field: "nombreEmpresa", headerName: "Nombre", width: 150 },
	{ field: "razonSocial", headerName: "Razón Social", width: 150 },
	{
		field: "calle",
		headerName: "Calle",
		width: 150,
		valueGetter: params => params.row.direccionEmpresa.calle,
	},
	{
		field: "km",
		headerName: "Km",
		width: 150,
		valueGetter: params => params.row.direccionEmpresa.km,
	},
	{
		field: "nroPuerta",
		headerName: "Nº Puerta",
		width: 150,
		valueGetter: params => params.row.direccionEmpresa.nroPuerta,
	},
	{
		field: "edit",
		headerName: "",
		width: 8,
		renderCell: params => {
			return <EditIcon className="edit-icon" />;
		},
	},
	{
		field: "delete",
		headerName: "",
		width: 8,
		renderCell: params => {
			return <DeleteIcon className="delete-icon" />;
		},
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
