import { useState, useEffect } from "react";
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
			/>

			<FormTextInputAutocomplete
				htmlFor="marca"
				label="Marca"
				name="marca"
				form="marcaForm"
				onChangeHandler={handleChangeAvf}
				optionArray={marcasVehiculos}
				maxOptionNumber={5}
			/>

			<FormInputText
				htmlFor="modelo"
				label="Modelo"
				name="modelo"
				onChangeHandler={handleChangeAvf}
			/>

			<FormInputNumber
				htmlFor="peso"
				label="Peso"
				name="peso"
				step="0.01"
				onChangeHandler={handleChangeAvf}
			/>

			<FormInputNumber
				htmlFor="capacidad"
				label="Capacidad"
				name="capacidad"
				step="0.01"
				onChangeHandler={handleChangeAvf}
			/>

			<FormInputDate
				htmlFor="vencimientoITV"
				label="Fecha de Vencimiento de la Inspección Técnica Vehicular"
				type="date"
				name="vencimientoITV"
				min={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeAvf}
			/>

			<FormH4 text="Permiso Nacional de Circulación" />

			<FormInputNumber
				htmlFor="numero"
				label="Número"
				name="numero"
				onChangeHandler={handleChangeDtpnc}
			/>

			<FormInputDate
				htmlFor="fechaEmision"
				label="Fecha de Emision"
				type="date"
				name="fechaEmision"
				max={new Date().toISOString().split("T")[0]}
				onChange={handleChangeDtpnc}
			/>

			<FormInputDate
				htmlFor="fechaVencimiento"
				label="Fecha de Vencimiento"
				type="date"
				name="fechaVencimiento"
				min={new Date().toISOString().split("T")[0]}
				onChange={handleChangeDtpnc}
			/>

			<FormInputSubmit onClickHandler={() => console.log(avf)} value="Enviar" />
		</FormDiv>
	);
};
