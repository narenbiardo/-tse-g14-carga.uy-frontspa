import { useState, useEffect } from "react";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { FormSelect } from "../Utilities/FormSelect";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormInputText } from "../Utilities/FormInputText";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";

const rubros = [
	{ id: "1", nombre: "Alimentos, bebida, tabaco" },
	{ id: "2", nombre: "Industria frigorifica" },
	{ id: "3", nombre: "Pesca" },
];

const departamentos = [
	{ id: "1", nombre: "Montevideo" },
	{ id: "2", nombre: "Canelones" },
	{ id: "3", nombre: "Rocha" },
];

class DtDireccionPostal {
	constructor(calle, km, nroPuerta) {
		this.calle = calle;
		this.km = km;
		this.nroPuerta = nroPuerta;
	}
}

class IngresarGuiaViajeForm {
	constructor(rubro, volumen, fechaHora, origen, destino, nroEmpresa) {
		this.rubro = rubro;
		this.volumen = volumen;
		this.fechaHora = fechaHora;
		this.origen = origen;
		this.destino = destino;
		this.nroEmpresa = nroEmpresa;
	}
}

export const IngresarGuiaDeViaje = () => {
	const [igvf, setIgvf] = useState(new IngresarGuiaViajeForm());
	const [dtddpo, setDtddpo] = useState(new DtDireccionPostal());
	const [dtddpd, setDtddpd] = useState(new DtDireccionPostal());

	const handleChangeIgvf = e => {
		const { name, value } = e.target;
		setIgvf(prevData => ({ ...prevData, [name]: value }));
	};

	const handleChangeDtddpo = e => {
		const { name, value } = e.target;
		var insertName = name;
		insertName = insertName.replace("Origen", "");
		setDtddpo(prevData => ({ ...prevData, [insertName]: value }));
	};

	const handleChangeDtddpd = e => {
		const { name, value } = e.target;
		var insertName = name;
		insertName = insertName.replace("Destino", "");
		setDtddpd(prevData => ({ ...prevData, [insertName]: value }));
	};

	useEffect(() => {
		setIgvf(prevData => ({
			...prevData,
			["origen"]: dtddpo,
			["destino"]: dtddpd,
		}));
	}, [dtddpo, dtddpd]);

	return (
		<FormDiv>
			<FormH2 text="Ingresar Guía de Viaje" />

			<FormSelect
				htmlFor="rubro"
				label="Rubro"
				name="rubro"
				form="rubroForm"
				onChangeHandler={handleChangeIgvf}
				optionDisabled="Seleccionar rubro"
				valueArray={rubros}
			/>

			<FormInputNumber
				htmlFor="volumen"
				label="Volumen"
				name="volumen"
				step="0.01"
				onChangeHandler={handleChangeIgvf}
			/>

			<FormInputDate
				htmlFor="fechaHora"
				label="Fecha y Hora"
				type="datetime-local"
				name="fechaHora"
				min={new Date().toISOString().slice(0, 16)}
				onChangeHandler={handleChangeIgvf}
			/>

			<FormInputText
				htmlFor="nroEmpresa"
				label="Número de la Empresa"
				name="nroEmpresa"
				onChangeHandler={handleChangeIgvf}
			/>

			<FormH4 text="Dirección de Origen" />

			<FormInputText
				htmlFor="calleOrigen"
				label="Calle"
				name="calleOrigen"
				onChangeHandler={handleChangeDtddpo}
			/>

			<FormInputText
				htmlFor="nroPuertaOrigen"
				label="Número de Puerta"
				name="nroPuertaOrigen"
				onChangeHandler={handleChangeDtddpo}
			/>

			<FormInputText
				htmlFor="kmOrigen"
				label="Kilómetro"
				name="kmOrigen"
				onChangeHandler={handleChangeDtddpo}
			/>

			<FormSelect
				htmlFor="departamentoOrigen"
				label="Departamento"
				name="departamentoOrigen"
				form="departamentoOrigenForm"
				onChangeHandler={handleChangeDtddpo}
				optionDisabled="Seleccionar Departamento"
				valueArray={departamentos}
			/>

			<FormH4 text="Dirección de Destino" />

			<FormInputText
				htmlFor="calleDestino"
				label="Calle"
				name="calleDestino"
				onChangeHandler={handleChangeDtddpd}
			/>

			<FormInputText
				htmlFor="nroPuertaDestino"
				label="Número de Puerta"
				name="nroPuertaDestino"
				onChangeHandler={handleChangeDtddpd}
			/>

			<FormInputText
				htmlFor="kmDestino"
				label="Kilómetro"
				name="kmDestino"
				onChangeHandler={handleChangeDtddpd}
			/>

			<FormSelect
				htmlFor="departamentoDestino"
				label="Departamento"
				name="departamentoDestino"
				onChangeHandler={handleChangeDtddpd}
				optionDisabled="Seleccionar Departamento"
				valueArray={departamentos}
			/>

			<FormInputSubmit
				onClickHandler={() => console.log(igvf)}
				value="Enviar"
			/>
		</FormDiv>
	);
};
