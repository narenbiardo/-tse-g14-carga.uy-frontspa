import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { DtPermisoNacionalCirculacion, AgregarVehiculoForm } from "../classes";
import { fti, columnsEmpresasFull } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormH2 } from "../Utilities/FormH2";
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

export const ConsultarEmpresa = () => {
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemData, setSelectedItemData] = useState(null);
	const [empresas, setEmpresas] = useState([]);
	const [ef, setEf] = useState({});
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [quickFilterEmpresaValue, setquickFilterEmpresaValue] = useState("");

	const handleEditClick = (event, params) => {
		event.stopPropagation();
		setEf(params);
		setSelectedItem(params);
		setSelectedItemData(params);
		setIsOpen(true);
	};

	const handleDeleteClick = (event, params) => {
		Swal.fire({
			title: "¿Estas seguro?",
			text: `La empresa de número ${params.nroEmpresa} sera eliminada definitivamente`,
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, borrar",
			cancelButtonText: "Caneclar",
		}).then(result => {
			if (result.isConfirmed) {
				handleDeleteEmpresa(params.nroEmpresa);
			}
		});
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDeleteEmpresa = nroEmpresa => {
		setLoading(true);
		axios
			.delete(RESTEndpoints.funcionarioService.delEmpresa + nroEmpresa)
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
			.get(RESTEndpoints.funcionarioService.listEmpresas)
			.then(response => {
				setEmpresas(response.data);
			})
			.catch(error => {
				if (
					error.response.data ===
					"No existen vehiculos registrados en el sistema"
				)
					setEmpresas([]);
				console.log(error);
			});
	}, [loading]);

	const handleChangeEf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setEf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setEf(prevData => ({ ...prevData, ["marcaVehiculo"]: e }));
		}
	};

	const handleChangeDireccion = e => {
		const { name, value } = e.target;
		if (name == "calle") {
			setEf(prevData => ({
				...prevData,
				["direccionEmpresa"]: {
					["calle"]: value,
					["km"]: ef.direccionEmpresa.km,
					["nroPuerta"]: ef.direccionEmpresa.nroPuerta,
				},
			}));
		} else if (name == "km") {
			setEf(prevData => ({
				...prevData,
				["direccionEmpresa"]: {
					["calle"]: ef.direccionEmpresa.calle,
					["km"]: value,
					["nroPuerta"]: ef.direccionEmpresa.nroPuerta,
				},
			}));
		} else if (name == "nroPuerta") {
			setEf(prevData => ({
				...prevData,
				["direccionEmpresa"]: {
					["calle"]: ef.direccionEmpresa.calle,
					["km"]: ef.direccionEmpresa.km,
					["nroPuerta"]: value,
				},
			}));
		} else {
			console.log("Error setting direccion");
		}
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

	const handlePostEmpresa = async event => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.put(
				RESTEndpoints.funcionarioService.modEmpresa,
				ef
			);

			setLoading(false);
			handleCloseDialog();
			Swal.fire({
				title: "Confirmado",
				timer: 2500,
				text: "La empresa fue modificada con éxito!",
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

	const getRowIdEmpresas = row => {
		return Math.random().toString();
	};

	const handlequickFilterEmpresaValue = useCallback(
		value => {
			setquickFilterEmpresaValue(value);
		},
		[quickFilterEmpresaValue]
	);

	/*
	useEffect(() => {
		setAvf(prevData => ({ ...prevData, ["permisoCirculacion"]: dtpnc }));
	}, [dtpnc]);
	*/

	useEffect(() => {
		//handleMarcasVehiculo();
	}, []);

	const getRowClassName = params => {
		return params.indexRelativeToCurrentPage % 2 === 0
			? "striped-row-even"
			: "striped-row-odd";
	};

	return (
		<Container className="form-container shadow-dreamy">
			<FormH4 text={"Empresas"} />
			<DataGrid
				getRowClassName={getRowClassName}
				rows={empresas}
				columns={columnsEmpresasFull}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={(params, event) => {
					if (event.target.classList.contains("edit-icon")) {
						handleEditClick(event, params.row);
					} else if (event.target.classList.contains("delete-icon")) {
						handleDeleteClick(event, params.row);
					}
				}}
				getRowId={getRowIdEmpresas}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				slots={{
					toolbar: CustomToolbar,
				}}
				slotProps={{
					toolbar: {
						setQuickFilter: handlequickFilterEmpresaValue,
						placeholder: "Buscar por nombre",
					},
				}}
				filterModel={{
					items: [
						{
							id: 1,
							field: "nombreEmpresa",
							operator: "contains",
							value: quickFilterEmpresaValue,
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
					<DialogTitle className="dialog-title">Editar Empresa</DialogTitle>
					<DialogContent className="dialog">
						<p className="dialog-subtitle">Datos Empresa</p>
						<FormDiv onSubmit={handlePostEmpresa} id="editar-vehiculo-form">
							<>
								<FormInputDiv>
									<div>
										<label htmlFor="nroEmpresa" className="main-font">
											Nº Empresa
										</label>
									</div>
									<input
										type="text"
										name="nroEmpresa"
										onChangeHandler={handleChangeEf}
										value={ef.nroEmpresa}
										disabled
										className="form-input"
									/>
								</FormInputDiv>

								<FormInputText
									htmlFor="nombreEmpresa"
									label="Nombre"
									name="nombreEmpresa"
									onChangeHandler={handleChangeEf}
									inputValue={ef.nombreEmpresa}
									isValid={ef.nombreEmpresa?.length > 0}
									invalidText={"El nombre no puede estar vacío"}
									//firstTime={firstTimeInput.modelo}
									handleFirstTime={handleFirstTimeInput}
								/>

								<FormInputText
									htmlFor="razonSocial"
									label="Razón Social"
									name="razonSocial"
									onChangeHandler={handleChangeEf}
									inputValue={ef.razonSocial}
									isValid={ef.razonSocial?.length > 0}
									invalidText={"La Razón Social no puede ser vacía"}
									//firstTime={firstTimeInput.modelo}
									handleFirstTime={handleFirstTimeInput}
								/>

								<p className="dialog-subtitle">Dirección</p>

								<FormInputText
									htmlFor="calle"
									label="Calle"
									name="calle"
									onChangeHandler={handleChangeDireccion}
									inputValue={ef.direccionEmpresa.calle}
									isValid={ef.direccionEmpresa.calle?.length > 0}
									invalidText={"La calle no puede ser vacía"}
									//firstTime={firstTimeInput.modelo}
									handleFirstTime={handleFirstTimeInput}
								/>

								<FormInputText
									htmlFor="km"
									label="Km"
									name="km"
									onChangeHandler={handleChangeDireccion}
									inputValue={ef.direccionEmpresa.km}
									isValid={ef.direccionEmpresa.km?.length > 0}
									invalidText={"El Km no puede ser vacío"}
									//firstTime={firstTimeInput.modelo}
									handleFirstTime={handleFirstTimeInput}
								/>

								<FormInputText
									htmlFor="nroPuerta"
									label="Nº Puerta"
									name="nroPuerta"
									onChangeHandler={handleChangeDireccion}
									inputValue={ef.direccionEmpresa.nroPuerta}
									isValid={ef.direccionEmpresa.nroPuerta?.length > 0}
									invalidText={"El Nº Puerta no puede ser vacío"}
									//firstTime={firstTimeInput.modelo}
									handleFirstTime={handleFirstTimeInput}
								/>

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
										id="editar-vehiculo-form"
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
							</>
						</FormDiv>
					</DialogContent>
				</Dialog>
			)}
		</Container>
	);
};
