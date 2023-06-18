import { useState, useEffect, useCallback } from "react";
import { ListaVehiculos } from "./ListaVehiculos";
import { Button } from "react-bootstrap";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import {
	DtPermisoNacionalCirculacion,
	AgregarVehiculoForm,
	FirstTimeInput,
} from "../classes";
import { columnsVehiculosFull } from "../constants";
import { mainColor } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { FormSelectArray } from "../Utilities/FormSelectArray";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";

export const EliminarVehiculo = () => {
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");

	const handleMatriculaVehiculo = v => {
		setMatriculaVehiculo(v.matricula);
		handleDeleteVehiculo(v.matricula);
		console.log(v.matricula);
	};

	const handleListaVehiculos = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarVehiculos)
			.then(response => {
				//console.log(response.data);
				setvehiculos(
					response.data.map(vehiculo => {
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
					})
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const getRowIdVehiculos = row => {
		return Math.random().toString();
	};

	const handleQuickFilterMatriculaValue = useCallback(
		value => {
			setQuickFilterMatriculaValue(value);
		},
		[quickFilterMatriculaValue]
	);

	useEffect(() => {
		handleListaVehiculos();
	}, []);

	const handleDeleteVehiculo = matricula => {
		axios
			.delete(RESTEndpoints.encargadoService.eliminarVehiculo + matricula)
			.then(response => {
				console.log(response.data);
				handleListaVehiculos();
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<FormDiv>
			<FormH2 text="Eliminar Vehículo" />

			<DataGrid
				rows={vehiculos}
				columns={columnsVehiculosFull}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={p => handleMatriculaVehiculo(p.row)}
				getRowId={getRowIdVehiculos}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				components={{
					Toolbar: CustomToolbar,
				}}
				componentsProps={{
					toolbar: {
						setQuickFilter: handleQuickFilterMatriculaValue,
						placeholder: "Buscar por matricula",
					},
				}}
				filterModel={{
					items: [
						{
							id: 1,
							field: "matricula",
							operator: "contains",
							value: quickFilterMatriculaValue,
						},
					],
				}}
				density="compact"
				autoHeight

				/*DISABLED pageSizeOptions={[10, 25, 50]}*/
			/>
		</FormDiv>
	);
};
