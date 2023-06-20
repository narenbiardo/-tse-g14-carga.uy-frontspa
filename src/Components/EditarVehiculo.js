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
import { fti, columnsVehiculosFull } from "../constants";
import { mainColor } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import Container from "@mui/material/Container";

export const EditarVehiculo = () => {
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");

	const handleMatriculaVehiculo = v => {
		setMatriculaVehiculo(v);
		setAvf(v);
		setDtpnc(v.permisoCirculacion);
		console.log(v);
	};

	useEffect(() => {
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
	}, [matriculaVehiculo]);

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
				console.log(response.data);
				var marcas = [];
				response.data.map(element => marcas.push(element.nombre));
				setMarcasVehiculos(marcas);
				console.log(marcas);
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

	const handlePostVehiculo = event => {
		event.preventDefault();
		axios
			.put(RESTEndpoints.encargadoService.modVehiculo, {
				capacidad: parseFloat(avf.capacidad),
				marcaVehiculo: { nombre: avf.marcaVehiculo },
				matricula: avf.matricula,
				modelo: avf.modelo,
				nroEmpresa: jwt_decode(cookies.get("code")).nroEmpresa,
				permisoCirculacion: {
					fechaEmision: avf.permisoCirculacion.fechaEmision,
					fechaVencimiento: avf.permisoCirculacion.fechaVencimiento,
					numero: avf.permisoCirculacion.numero,
				},
				peso: parseFloat(avf.peso),
				vencimientoITV: avf.vencimientoITV,
			})
			.then(response => {
				setAvf(new AgregarVehiculoForm());
				setDtpnc(new DtPermisoNacionalCirculacion());
				setfirstTimeInput(fti);
				handleMatriculaVehiculo("");
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
			<FormDiv>
				<FormH2 text="Editar Vehículo" />
				{matriculaVehiculo === "" ? (
					<DataGrid
						getRowClassName={getRowClassName}
						rows={vehiculos}
						columns={columnsVehiculosFull}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => handleMatriculaVehiculo(p.row)}
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
				) : (
					/*<ListaVehiculos
					onMatriculaVehiculoChange={handleMatriculaVehiculo}
					vehiculosArray={vehiculos}
					showNroEmpresa={false}
				/>*/
					<>
						<FormInputDiv>
							<div>
								<label htmlFor="matricula">Matricula</label>
							</div>
							<input
								type="text"
								name="matricula"
								onChangeHandler={handleChangeAvf}
								value={avf.matricula}
								disabled
								className="form-input"
							/>
						</FormInputDiv>

						<FormInputDiv>
							<div>
								<label htmlFor="marcaVehiculo">Marca</label>
							</div>
							<select
								name="marcaVehiculo"
								form="marcaVehiculoForm"
								onChange={handleChangeAvf}
								value={avf.marcaVehiculo}
								defaultValue=""
								required
								className="form-input"
							>
								<option value="" disabled>
									Seleccionar Marca
								</option>
								{marcasVehiculos.map((element, index) => (
									<option value={element} key={Math.random()}>
										{element}
									</option>
								))}
							</select>
						</FormInputDiv>

						<FormInputText
							htmlFor="modelo"
							label="Modelo"
							name="modelo"
							onChangeHandler={handleChangeAvf}
							inputValue={avf.modelo ? avf.modelo : ""}
							isValid={avf.modelo?.length > 0}
							invalidText={"El modelo no puede estar vacío"}
							firstTime={firstTimeInput.modelo}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputNumber
							htmlFor="peso"
							label="Peso"
							name="peso"
							step="0.01"
							onChangeHandler={handleChangeAvf}
							inputValue={avf.peso ? avf.peso : ""}
							isValid={avf.peso?.length > 0}
							invalidText={"El peso no puede estar vacío"}
							firstTime={firstTimeInput.peso}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputNumber
							htmlFor="capacidad"
							label="Capacidad"
							name="capacidad"
							step="0.01"
							onChangeHandler={handleChangeAvf}
							inputValue={avf.capacidad ? avf.capacidad : ""}
							isValid={avf.capacidad?.length > 0}
							invalidText={"La capacidad no puede estar vacía"}
							firstTime={firstTimeInput.capacidad}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputDate
							htmlFor="vencimientoITV"
							label="Fecha de Vencimiento de la Inspección Técnica Vehicular"
							type="date"
							name="vencimientoITV"
							min={new Date().toISOString().split("T")[0]}
							onChangeHandler={handleChangeAvf}
							inputValue={avf.vencimientoITV ? avf.vencimientoITV : ""}
							isValid={avf.vencimientoITV?.length > 0}
							invalidText={
								"La fecha de vencimiento de la inspección técnica vehicular no puede ser vacía"
							}
							firstTime={firstTimeInput.vencimientoITV}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormH4 text="Permiso Nacional de Circulación" />

						<FormInputNumber
							htmlFor="numero"
							label="Número"
							name="numero"
							onChangeHandler={handleChangeDtpnc}
							inputValue={dtpnc.numero ? dtpnc.numero : ""}
							isValid={dtpnc.numero?.length > 0}
							invalidText={
								"El número del permiso nacional de circulación no puede estar vacío"
							}
							firstTime={firstTimeInput.numero}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputDate
							htmlFor="fechaEmision"
							label="Fecha de Emision"
							type="date"
							name="fechaEmision"
							max={new Date().toISOString().split("T")[0]}
							onChangeHandler={handleChangeDtpnc}
							inputValue={dtpnc.fechaEmision ? dtpnc.fechaEmision : ""}
							isValid={dtpnc.fechaEmision?.length > 0}
							invalidText={
								"La fecha de emisión del permiso nacional de circulación no puede ser vacía"
							}
							firstTime={firstTimeInput.fechaEmision}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputDate
							htmlFor="fechaVencimiento"
							label="Fecha de Vencimiento"
							type="date"
							name="fechaVencimiento"
							min={new Date().toISOString().split("T")[0]}
							onChangeHandler={handleChangeDtpnc}
							inputValue={dtpnc.fechaVencimiento ? dtpnc.fechaVencimiento : ""}
							isValid={dtpnc.fechaVencimiento?.length > 0}
							invalidText={
								"La fecha de vencimiento del permiso nacional de circulación no puede ser vacía"
							}
							firstTime={firstTimeInput.fechaVencimiento}
							handleFirstTime={handleFirstTimeInput}
						/>

						<Button
							type="submit"
							className="btn-principal submit mt-2 mb-2"
							onClick={handlePostVehiculo} // Utiliza la función sin el sufijo "Handler"
						>
							Enviar
						</Button>
						<Button onClick={() => handleMatriculaVehiculo("")}>Volver</Button>
					</>
				)}
			</FormDiv>
		</Container>
	);
};
