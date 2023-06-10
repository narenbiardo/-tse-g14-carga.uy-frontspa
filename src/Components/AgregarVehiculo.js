import { useState, useEffect } from "react";
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
import { fti } from "../constants";
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

export const AgregarVehiculo = () => {
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);

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
			.get(RESTEndpoints.vehiculosService.listaMarcasVehiculos)
			.then(response => {
				//console.log(response.data);
				setMarcasVehiculos(response.data);
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

	const handlePostVehiculo = () => {
		axios
			.post(RESTEndpoints.vehiculosService.agregarVehiculo, {
				capacidad: parseFloat(avf.capacidad),
				marcaVehiculo: avf.marcaVehiculo,
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
				console.log(response.data);
				setAvf(new AgregarVehiculoForm());
				setDtpnc(new DtPermisoNacionalCirculacion());
				setfirstTimeInput(fti);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		setAvf(prevData => ({ ...prevData, ["permisoCirculacion"]: dtpnc }));
	}, [dtpnc]);

	useEffect(() => {
		handleMarcasVehiculo();
	}, []);

	return (
		<FormDiv>
			<FormH2 text="Agregar Vehículo" />

			<FormInputText
				htmlFor="matricula"
				label="Matricula"
				name="matricula"
				onChangeHandler={handleChangeAvf}
				inputValue={avf.matricula ? avf.matricula : ""}
				isValid={avf.matricula?.length === 7}
				invalidText={"La matrícula es inválida"}
				firstTime={firstTimeInput.matricula}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputDiv>
				<label htmlFor="marcaVehiculo">Marca</label>
				<select
					name="marcaVehiculo"
					form="marcaVehiculoForm"
					onChange={handleChangeAvf}
					value={avf.marcaVehiculo}
					defaultValue=""
					required
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid " + mainColor,
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
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

			<FormInputSubmit
				onClickHandler={handlePostVehiculo}
				value="Enviar"
				validForm={
					avf.matricula?.length === 7 &&
					(avf.marcaVehiculo ? true : false) &&
					avf.modelo?.length > 0 &&
					avf.peso?.length > 0 &&
					avf.capacidad?.length > 0 &&
					avf.vencimientoITV?.length > 0 &&
					dtpnc.numero?.length > 0 &&
					dtpnc.fechaEmision?.length > 0 &&
					dtpnc.fechaVencimiento?.length > 0
				}
			/>
		</FormDiv>
	);
};
