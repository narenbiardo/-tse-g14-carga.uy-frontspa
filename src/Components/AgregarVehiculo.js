import { useState, useEffect } from "react";
import cookies from "js-cookie";
import axios from "axios";
import "react-autocomplete-input/dist/bundle.css";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";

const marcasVehiculos = [
	"Audi",
	"BMW",
	"Chevrolet",
	"Ferrari",
	"Ford",
	"Honda",
	"Hyundai",
	"Jaguar",
	"Jeep",
	"Kia",
	"Lamborghini",
	"Land Rover",
	"Lexus",
	"Maserati",
	"Mazda",
	"Mercedes-Benz",
	"Nissan",
	"Porsche",
	"Subaru",
	"Tesla",
	"Toyota",
	"Volkswagen",
	"Volvo",
];

class DtPermisoNacionalCirculacion {
	constructor(numero, fechaEmision, fechaVencimiento) {
		this.numero = numero;
		this.fechaEmision = fechaEmision;
		this.fechaVencimiento = fechaVencimiento;
	}
}

class AgregarVehiculoForm {
	constructor(
		matricula,
		marca,
		modelo,
		peso,
		capacidad,
		pnc, // DtPermisoNacionalCirculacion
		vencimientoITV // Fecha de vencimiento de la inspeccion tecnica vehicular
	) {
		this.matricula = matricula;
		this.marca = marca;
		this.modelo = modelo;
		this.peso = peso;
		this.capacidad = capacidad;
		this.pnc = pnc;
		this.vencimientoITV = vencimientoITV;
	}
}

export const AgregarVehiculo = () => {
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());

	const handleChangeAvf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setAvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAvf(prevData => ({ ...prevData, ["marca"]: e }));
		}
	};

	const handleChangeDtpnc = e => {
		const { name, value } = e.target;
		setDtpnc(prevData => ({ ...prevData, [name]: value }));
	};

	const handlePostVehiculo = () => {
		console.log(avf);
		axios
			.get("http://localhost:8080/api/echo/jwt")
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		setAvf(prevData => ({ ...prevData, ["pnc"]: dtpnc }));
	}, [dtpnc]);

	return (
		<FormDiv>
			<FormH2 text="Agregar Vehículo" />

			<FormInputText
				htmlFor="matricula"
				label="Matricula"
				name="matricula"
				onChangeHandler={handleChangeAvf}
				isValid={avf.matricula?.length === 7}
				invalidText={"La matrícula es inválida"}
			/>

			<FormTextInputAutocomplete
				htmlFor="marca"
				label="Marca"
				name="marca"
				form="marcaForm"
				onChangeHandler={handleChangeAvf}
				optionArray={marcasVehiculos}
				maxOptionNumber={5}
				isValid={avf.marca?.length > 0}
				invalidText={"La marca no puede estar vacía"}
			/>

			<FormInputText
				htmlFor="modelo"
				label="Modelo"
				name="modelo"
				onChangeHandler={handleChangeAvf}
				isValid={avf.modelo?.length > 0}
				invalidText={"El modelo no puede estar vacío"}
			/>

			<FormInputNumber
				htmlFor="peso"
				label="Peso"
				name="peso"
				step="0.01"
				onChangeHandler={handleChangeAvf}
				isValid={avf.peso?.length > 0}
				invalidText={"El peso no puede estar vacío"}
			/>

			<FormInputNumber
				htmlFor="capacidad"
				label="Capacidad"
				name="capacidad"
				step="0.01"
				onChangeHandler={handleChangeAvf}
				isValid={avf.capacidad?.length > 0}
				invalidText={"La capacidad no puede estar vacía"}
			/>

			<FormInputDate
				htmlFor="vencimientoITV"
				label="Fecha de Vencimiento de la Inspección Técnica Vehicular"
				type="date"
				name="vencimientoITV"
				min={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeAvf}
				isValid={avf.vencimientoITV?.length > 0}
				invalidText={
					"La fecha de vencimiento de la inspección técnica vehicular no puede ser vacía"
				}
			/>

			<FormH4 text="Permiso Nacional de Circulación" />

			<FormInputNumber
				htmlFor="numero"
				label="Número"
				name="numero"
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.numero?.length > 0}
				invalidText={
					"El número del permiso nacional de circulación no puede estar vacío"
				}
			/>

			<FormInputDate
				htmlFor="fechaEmision"
				label="Fecha de Emision"
				type="date"
				name="fechaEmision"
				max={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.fechaEmision?.length > 0}
				invalidText={
					"La fecha de emisión del permiso nacional de circulación no puede ser vacía"
				}
			/>

			<FormInputDate
				htmlFor="fechaVencimiento"
				label="Fecha de Vencimiento"
				type="date"
				name="fechaVencimiento"
				min={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.fechaVencimiento?.length > 0}
				invalidText={
					"La fecha de vencimiento del permiso nacional de circulación no puede ser vacía"
				}
			/>

			<FormInputSubmit
				onClickHandler={handlePostVehiculo}
				value="Enviar"
				validForm={
					avf.matricula?.length === 7 &&
					avf.marca?.length > 0 &&
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
