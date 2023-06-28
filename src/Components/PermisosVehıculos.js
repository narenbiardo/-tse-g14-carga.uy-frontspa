import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { DtPermisoNacionalCirculacion, AgregarVehiculoForm } from "../classes";
import { fti, columnsVehiculosITV } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import Container from "@mui/material/Container";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import Swal from "sweetalert2";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export const PermisosVehiculos = () => {
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemData, setSelectedItemData] = useState(null);
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [empresaVehiculo, setEmpresaVehiculo] = useState({});
	const [vehiculos, setvehiculos] = useState([]);
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");

	const handleEditClick = (event, params) => {
		event.stopPropagation();
		setMatriculaVehiculo(params.matricula);
		setEmpresaVehiculo({
			nroEmpresa: params.nroEmpresa,
			nombreEmpresa: params.nombreEmpresa,
		});
		setAvf(params);
		setDtpnc(params.permisoCirculacion);

		setSelectedItem(params);
		setSelectedItemData(params);
		setIsOpen(true);
	};

	const handleDeleteClick = (event, params) => {
		setMatriculaVehiculo(params.matricula);
		Swal.fire({
			title: "¿Estas seguro?",
			text: `El vehiculo de matricula ${params.matricula} sera eliminado definitivamente`,
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, borrar",
			cancelButtonText: "Caneclar",
		}).then(result => {
			if (result.isConfirmed) {
				handleDeleteVehiculo(params.matricula);
			}
		});
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDeleteVehiculo = matricula => {
		setLoading(true);
		axios
			.delete(RESTEndpoints.encargadoService.eliminarVehiculo + matricula)
			.then(response => {
				Swal.fire({
					title: "Borrado!",
					text: "El vehiculo fue borrado",
					icon: "success",
					willClose: () => {
						setLoading(false);
					},
				});
			})
			.catch(error => {
				setLoading(false);
				handleCloseDialog();
				let errorMessage = "Ha ocurrido un error, vuelva a intentarlo";

				if (
					error.response.data ===
					"jakarta.transaction.RollbackException: ARJUNA016053: Could not commit transaction."
				) {
					errorMessage =
						"El vehiculo se encuentra asociado a una guia de viaje, no puede ser eliminado";
				}

				Swal.fire({
					text: errorMessage,
					title: "Error",
					icon: "error",
					confirmButtonText: "Aceptar",
				});
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(RESTEndpoints.funcionarioService.fiscalizacion)
			.then(response => {
				var vehiculosList = [];
				response.data.map(empresa => {
					empresa.vehiculos.map(vehiculo => {
						const permisoCirculacion = new DtPermisoNacionalCirculacion(
							vehiculo.permisoCirculacion.numero,
							vehiculo.permisoCirculacion.fechaEmision,
							vehiculo.permisoCirculacion.fechaVencimiento
						);

						vehiculosList.push({
							nroEmpresa: empresa.nroEmpresa,
							nombreEmpresa: empresa.nombreEmpresa,
							matricula: vehiculo.matricula,
							marcaVehiculo: vehiculo.marcaVehiculo.nombre,
							modelo: vehiculo.modelo,
							capacidad: vehiculo.capacidad.toString(),
							peso: vehiculo.peso.toString(),
							permisoCirculacion: permisoCirculacion,
							vencimientoITV: vehiculo.vencimientoITV,
						});
					});
				});
				setvehiculos(vehiculosList);
			})
			.catch(error => {
				if (
					error.response.data ===
					"No existen vehiculos registrados en el sistema"
				)
					setvehiculos([]);
				console.log(error);
			});
	}, [loading]);

	const handleChangeAvf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setAvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAvf(prevData => ({ ...prevData, ["marcaVehiculo"]: e }));
		}
	};

	const handleChangeDtpnc = e => {
		const { name, value } = e.target;
		setDtpnc(prevData => ({ ...prevData, [name]: value }));
	};

	const handleMarcasVehiculo = () => {
		axios
			.get(RESTEndpoints.publicService.listaMarcasVehiculos)
			.then(response => {
				var marcas = [];
				response.data.map(element => marcas.push(element.nombre));
				setMarcasVehiculos(marcas);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleFirstTimeInput = e => {
		if (e.target) {
			const { name } = e.target;
			setfirstTimeInput(prevData => ({ ...prevData, [name]: false }));
		} else {
			//e.target will be null in TextInput component
			setfirstTimeInput(prevData => ({
				...prevData,
				["marcaVehiculo"]: false,
			}));
		}
	};

	const handlePostVehiculo = async event => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.put(
				RESTEndpoints.funcionarioService.modificarVencimientoITV +
					matriculaVehiculo,
				avf.vencimientoITV,
				{ headers: { "Content-Type": "application/json" } }
			);

			setLoading(false);
			handleCloseDialog();
			Swal.fire({
				title: "Confirmado",
				timer: 2500,
				text: "El vehiculo fue modificado con éxito!",
				icon: "success",
				confirmButtonText: "Aceptar",
			});
		} catch (error) {
			setLoading(false);
			handleCloseDialog();
			let errorMessage = "Ha ocurrido un error, vuelva a intentarlo";

			if (error.response && error.response.data) {
				errorMessage = `${error.response.data}`;
			}

			Swal.fire({
				text: errorMessage,
				title: "Error",
				icon: "error",
				confirmButtonText: "Aceptar",
			});
		}
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
		setAvf(prevData => ({ ...prevData, ["permisoCirculacion"]: dtpnc }));
	}, [dtpnc]);

	useEffect(() => {
		handleMarcasVehiculo();
	}, []);

	const getRowClassName = params => {
		return params.indexRelativeToCurrentPage % 2 === 0
			? "striped-row-even"
			: "striped-row-odd";
	};

	return (
		<Container className="form-container shadow-dreamy">
			<FormH4 text={"Vehículos"} />
			<DataGrid
				getRowClassName={getRowClassName}
				rows={vehiculos}
				columns={columnsVehiculosITV}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={(params, event) => {
					if (event.target.classList.contains("edit-icon")) {
						handleEditClick(event, params.row);
					}
				}}
				getRowId={getRowIdVehiculos}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				slots={{
					toolbar: CustomToolbar,
				}}
				slotProps={{
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
				autoHeight
			/>

			{selectedItem && (
				<Dialog
					open={isOpen}
					onClose={handleCloseDialog}
					maxWidth="sm"
					fullWidth
					classes={{ paper: "border-14" }}
				>
					<DialogTitle className="dialog-title">
						Editar Vencimiento ITV del Vehículo
					</DialogTitle>
					<DialogContent className="dialog">
						<p className="dialog-subtitle">Datos Vehículo</p>
						<FormDiv onSubmit={handlePostVehiculo} id="editar-vehiculo-form">
							<>
								<FormInputDiv>
									<TextField
										name="nroEmpresa"
										id="outlined-basic"
										label="Nº Empresa"
										variant="outlined"
										fullWidth
										disabled
										value={empresaVehiculo.nroEmpresa}
										onChange={handleChangeAvf}
										InputLabelProps={{ shrink: true }}
										type="text"
										size="small"
									/>
								</FormInputDiv>

								<FormInputDiv>
									<TextField
										name="nombreEmpresa"
										id="outlined-basic"
										label="Nombre Empresa"
										variant="outlined"
										fullWidth
										disabled
										value={empresaVehiculo.nombreEmpresa}
										onChange={handleChangeAvf}
										InputLabelProps={{ shrink: true }}
										type="text"
										size="small"
									/>
								</FormInputDiv>

								<FormInputDiv>
									<TextField
										name="matricula"
										id="outlined-basic"
										label="Matricula"
										variant="outlined"
										fullWidth
										disabled
										value={matriculaVehiculo}
										onChange={handleChangeAvf}
										InputLabelProps={{ shrink: true }}
										type="text"
										size="small"
									/>
								</FormInputDiv>

								<FormInputDiv>
									<TextField
										name="marcaVehiculo"
										form="marcaVehiculoForm"
										label="Marca"
										variant="outlined"
										fullWidth
										disabled
										value={avf.marcaVehiculo}
										select
										onChange={handleChangeAvf}
										defaultValue=""
										required
										margin="dense"
										size="small"
										color="success"
									>
										{marcasVehiculos.map((element, index) => (
											<MenuItem key={Math.random()} value={element}>
												{element}
											</MenuItem>
										))}
									</TextField>
								</FormInputDiv>

								<FormInputDiv>
									<TextField
										name="modelo"
										id="outlined-basic"
										label="Modelo"
										variant="outlined"
										fullWidth
										disabled
										value={avf.modelo}
										onChange={handleChangeAvf}
										InputLabelProps={{ shrink: true }}
										type="text"
										size="small"
									/>
								</FormInputDiv>

								<FormInputDate
									htmlFor="vencimientoITV"
									label="Fecha vencimiento ITV"
									type="date"
									name="vencimientoITV"
									min={new Date().toISOString().split("T")[0]}
									onChangeHandler={handleChangeAvf}
									inputValue={avf.vencimientoITV} //{selectedItemData?.vencimientoITV || ""}
									isValid={avf.vencimientoITV?.length > 0}
									invalidText={
										"La fecha de vencimiento de la ITV no puede ser vacía"
									}
									firstTime={firstTimeInput.vencimientoITV}
									handleFirstTime={handleFirstTimeInput}
								/>
							</>
						</FormDiv>
					</DialogContent>
					<DialogActions>
						<Button
							type="submit"
							variant="contained"
							size="medium"
							className="dialog-confirm-btn"
							startIcon={
								loading ? <CircularProgress size={20} /> : <CheckIcon />
							}
							disabled={loading}
							form="editar-vehiculo-form"
						>
							EDITAR
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
