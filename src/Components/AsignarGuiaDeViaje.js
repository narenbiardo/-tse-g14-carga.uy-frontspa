import { useState, useEffect, useCallback } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { AsignarGuiaViajeForm } from "../classes";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "react-bootstrap";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import {
	columnsVehiculos,
	columnsGuiasDeViaje,
	columnsChoferes,
} from "../constants";
import { FormH4 } from "../Utilities/FromH4";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const AsignarGuiaDeViaje = () => {
	const [agvf, setAgvf] = useState(new AsignarGuiaViajeForm());
	const [guiasDeViaje, setGuiasDeViaje] = useState([]);
	const [choferes, setChoferes] = useState([]);
	const [vehiculos, setVehiculos] = useState([]);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");
	const [quickFilterRubroValue, setQuickFilterRubroValue] = useState("");

	const handleChangeAgvf = e => {
		if (e.idGuiaViaje) {
			setAgvf(prevData => ({ ...prevData, ["idGuiaViaje"]: e.idGuiaViaje }));
		} else if (e.matricula) {
			setAgvf(prevData => ({
				...prevData,
				["matriculaVehiculo"]: e.matricula,
			}));
		} else if (e.cedula) {
			setAgvf(prevData => ({
				...prevData,
				["cedulaChofer"]: e.cedula,
			}));
		} else {
			console.log("Error setting agvf");
		}
	};

	const handleGuiasDeViaje = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarGuiasAsignables)
			.then(response => {
				let gdv = [];
				response.data.map(guia => {
					gdv.push({
						id: guia.idGuiaViaje,
						rubro: guia.rubro.nombre,
						volumenCarga: guia.volumenCarga,
						kmOrigen: guia.origen.km,
						kmDestino: guia.destino.km,
						fecha: new Date(guia.fechaHora).toLocaleDateString(),
						hora: new Date(guia.fechaHora).toLocaleTimeString(),
						assignButton: (
							<AssignmentIcon
								className="edit-icon"
								onClick={() => handleChangeAgvf(guia)}
							/>
						),
					});
				});
				setGuiasDeViaje(gdv);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleChoferes = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarChoferes)
			.then(response => {
				setChoferes(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleVehiculos = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarVehiculos)
			.then(response => {
				let vList = [];
				response.data.map(v => {
					vList.push({
						matricula: v.matricula,
						marca: v.marcaVehiculo.nombre,
						modelo: v.modelo,
					});
				});
				setVehiculos(vList);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handlePostAsignarGuiaDeViaje = event => {
		console.log(agvf);
		event.preventDefault();
		axios
			.post(RESTEndpoints.encargadoService.asignarGuiaViaje, {
				idGuiaViaje: agvf.idGuiaViaje,
				nroEmpresa: jwt_decode(cookies.get("code")).nroEmpresa,
				cedulaChofer: agvf.cedulaChofer,
				matriculaVehiculo: agvf.matriculaVehiculo,
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const getRowIdVehiculo = row => {
		return row.matricula + row.modelo;
	};

	const getRowIdGuiaDeViaje = row => {
		return Math.random().toString();
	};

	const getRowIdChoferes = row => {
		return Math.random().toString();
	};

	const handleSetQuickFilterMatricula = useCallback(
		value => {
			setQuickFilterMatriculaValue(value);
		},
		[setQuickFilterMatriculaValue]
	);

	const handleSetQuickFilterRubro = useCallback(
		value => {
			setQuickFilterRubroValue(value);
		},
		[setQuickFilterRubroValue]
	);

	useEffect(() => {
		handleGuiasDeViaje();
		handleChoferes();
		handleVehiculos();
	}, [agvf.idGuiaViaje]);

	return (
		<Container className="py-4 bg-white rounded-4 border border-secondary-subtle">
			<FormH2 text="Asignar Guía de Viaje" />

			{agvf.idGuiaViaje ? (
				<>
					<FormH4 text={"Chofer"} />

					<DataGrid
						rows={choferes}
						columns={columnsChoferes}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => handleChangeAgvf(p.row)}
						getRowId={getRowIdChoferes}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterRubro,
								placeholder: "Buscar por nombre",
							},
						}}
						filterModel={{
							items: [
								{
									id: 1,
									field: "nombre",
									operator: "contains",
									value: quickFilterRubroValue,
								},
							],
						}}
						density="compact"
						autoHeight

						/*DISABLED pageSizeOptions={[10, 25, 50]}*/
					/>

					<FormH4 text={"Vehículo"} />

					<DataGrid
						rows={vehiculos}
						columns={columnsVehiculos}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => handleChangeAgvf(p.row)}
						getRowId={getRowIdVehiculo}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterMatricula,
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

					<Button
						type="submit"
						className="btn-principal submit mt-2 mb-2"
						onClick={handlePostAsignarGuiaDeViaje}
					>
						Enviar
					</Button>

					<Button
						className="btn-secundario submit mt-2 mb-2"
						onClick={() => setAgvf([])}
					>
						{" "}
						Volver{" "}
					</Button>
				</>
			) : (
				<>
					<DataGrid
						rows={guiasDeViaje}
						columns={columnsGuiasDeViaje}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						//onRowClick={p => handleChangeAgvf(p.row)}
						getRowId={getRowIdGuiaDeViaje}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterRubro,
								placeholder: "Buscar por rubro",
							},
						}}
						filterModel={{
							items: [
								{
									id: 1,
									field: "rubro",
									operator: "contains",
									value: quickFilterRubroValue,
								},
							],
						}}
						density="compact"
						autoHeight

						/*DISABLED pageSizeOptions={[10, 25, 50]}*/
					/>
				</>
			)}
		</Container>
	);
};
