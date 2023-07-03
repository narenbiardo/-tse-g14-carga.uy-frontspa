import { useState, useEffect, useCallback } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { AsignarGuiaViajeForm } from "../classes";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import {
	columnsVehiculos,
	columnsGuiasDeViaje,
	columnsChoferes,
} from "../constants";
import Container from "@mui/material/Container";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { FormH4 } from "../Utilities/FromH4";
import CircularProgress from "@mui/material/CircularProgress";

export const AsignarGuiaDeViaje = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [agvf, setAgvf] = useState(new AsignarGuiaViajeForm());
	const [guiasDeViaje, setGuiasDeViaje] = useState([]);
	const [choferes, setChoferes] = useState([]);
	const [vehiculos, setVehiculos] = useState([]);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");
	const [quickFilterRubroValue, setQuickFilterRubroValue] = useState("");

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleChangeAgvf = row => {
		setSelectedItem(row);
		setIsOpen(true);
		if (row.id) {
			setAgvf(prevData => ({ ...prevData, ["idGuiaViaje"]: row.id }));
		} else if (row.matricula) {
			setAgvf(prevData => ({
				...prevData,
				["matriculaVehiculo"]: row.matricula,
			}));
		} else if (row.cedula) {
			setAgvf(prevData => ({
				...prevData,
				["cedulaChofer"]: row.cedula,
			}));
		} else {
			console.log("Error setting agvf");
		}
	};

	const handleGuiasDeViaje = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarGuiasAsignables)
			.then(response => {
				console.log(response);
				let gdv = [];
				response.data.map(guia => {
					gdv.push({
						id: guia.idGuiaViaje,
						rubro: guia.rubro.nombre,
						origen: `${guia.origen.calle} ${guia.origen.nroPuerta}, km ${guia.origen.km}`,
						destino: `${guia.destino.calle} ${guia.destino.nroPuerta}, km ${guia.destino.km} `,
						fecha: new Date(guia.fechaHora).toLocaleDateString(),
						hora: new Date(guia.fechaHora).toLocaleTimeString(),
						estadoViaje: guia.estadoViaje,
						volumenCarga: `${guia.volumenCarga} Kg`,
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
				console.log(response);
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
				console.log(response);
				let vList = [];
				response.data.map(v => {
					vList.push({
						matricula: v.matricula,
						marca: v.marcaVehiculo.nombre,
						modelo: v.modelo,
						capacidad: `${v.capacidad} Kg`,
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
		setLoading(true);
		if (
			agvf.cedulaChofer === undefined ||
			agvf.matriculaVehiculo === undefined
		) {
			Swal.fire({
				text: "Debe seleccionar un chofer y un vehiculo",
				title: "Error",
				icon: "error",
				confirmButtonText: "Aceptar",
			});
			setLoading(false);
		} else {
			axios
				.post(RESTEndpoints.encargadoService.asignarGuiaViaje, {
					idGuiaViaje: agvf.idGuiaViaje,
					nroEmpresa: jwt_decode(cookies.get("code")).nroEmpresa,
					cedulaChofer: agvf.cedulaChofer,
					matriculaVehiculo: agvf.matriculaVehiculo,
				})
				.then(response => {
					handleCloseDialog();
					Swal.fire({
						title: "Confirmado",
						timer: 2500,
						text: "La guia fue asignada con éxito!",
						icon: "success",
						confirmButtonText: "Aceptar",
					});
					setLoading(false);
					console.log(response.data);
				})
				.catch(error => {
					let errorMessage =
						"Ha ocurrido un error al ingresar la guia, vuelva a intentarlo";

					if (error.response && error.response.data) {
						errorMessage = `${error.response.data}`;
					}

					Swal.fire({
						text: errorMessage,
						title: "Error",
						icon: "error",
						confirmButtonText: "Aceptar",

					});
					console.log(error);
					setLoading(false);
				});
		}
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
	}, [loading]);

	const getRowClassName = params => {
		return params.indexRelativeToCurrentPage % 2 === 0
			? "striped-row-even"
			: "striped-row-odd";
	};

	return (
		<Container className="form-container shadow-dreamy">
			<FormH4 text="Guias de Viaje" />
			<DataGrid
				getRowClassName={getRowClassName}
				rows={guiasDeViaje}
				columns={columnsGuiasDeViaje}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={(p, event) => {
					if (event.target.classList.contains("asignar-btn")) {
						handleChangeAgvf(p.row);
					}
				}}
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
			/>

			{selectedItem && (
				<Dialog
					open={isOpen}
					onClose={handleCloseDialog}
					maxWidth="md"
					fullWidth
					className="z-index-200"
					classes={{ paper: "border-14" }}
				>
					<DialogTitle className="dialog-title">
						Asignar Guia de Viaje
					</DialogTitle>
					<DialogContent className="dialog">
						<p className="dialog-subtitle">Seleccione un Chofer</p>

						<DataGrid
							getRowClassName={getRowClassName}
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
						/>

						<p className="dialog-subtitle">Seleccione un Vehiculo</p>

						<DataGrid
							getRowClassName={getRowClassName}
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
						/>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							size="medium"
							className="dialog-confirm-btn"
							startIcon={
								loading ? <CircularProgress size={20} /> : <CheckIcon />
							}
							disabled={loading}
							onClick={handlePostAsignarGuiaDeViaje}
						>
							ASIGNAR
						</Button>
						<Button
							variant="outlined"
							size="medium"
							className="dialog-close-btn"
							startIcon={<CloseIcon />}
							onClick={handleCloseDialog}
						>
							CERRAR
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
