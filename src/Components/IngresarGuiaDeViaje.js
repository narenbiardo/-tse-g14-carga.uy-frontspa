import { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { RESTEndpoints } from "../Services/RestService";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { FormSelect } from "../Utilities/FormSelect";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormInputText } from "../Utilities/FormInputText";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { FormInputDiv } from "../Utilities/FormInputDiv";

/*
const rubros = [
	{ id: "1", nombre: "Alimentos, bebida, tabaco" },
	{ id: "2", nombre: "Industria frigorifica" },
	{ id: "3", nombre: "Pesca" },
];
*/

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
	const [rubros, setRubros] = useState([]);
	const jwtDecoded = jwt_decode(cookies.get("code"));

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

	const handlePostGuiaDeViaje = () => {
		axios
			.post(RESTEndpoints.encargadoService.ingresarGuiaViaje, {
				rubro: {
					nombre: igvf.rubro,
				},
				volumenCarga: igvf.volumen,
				fechaHora: igvf.fechaHora,
				origen: {
					calle: igvf.origen.calle,
					nroPuerta: igvf.origen.nroPuerta,
					km: igvf.origen.km,
				},
				destino: {
					calle: igvf.destino.calle,
					nroPuerta: igvf.destino.nroPuerta,
					km: igvf.destino.km,
				},
				estadoViaje: "ASIGNABLE",
				nroEmpresa: jwtDecoded.nroEmpresa,
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleRubros = () => {
		axios
			.get(RESTEndpoints.encargadoService.rubros)
			.then(response => {
				setRubros(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		setIgvf(prevData => ({
			...prevData,
			["origen"]: dtddpo,
			["destino"]: dtddpd,
		}));
	}, [dtddpo, dtddpd]);

	useEffect(() => {
		handleRubros();
	}, []);

	return (
		<FormDiv>
			<FormH2 text="Ingresar Guía de Viaje" />

			<FormInputDiv>
				<label htmlFor="rubro">Rubro</label>
				<select
					name="rubro"
					form="rubroForm"
					onChange={handleChangeIgvf}
					value={igvf.rubro}
					defaultValue=""
					required
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				>
					<option value="" disabled>
						Seleccionar rubro
					</option>
					{rubros.map(element => (
						<option value={element.nombre} key={Math.random()}>
							{element.nombre}
						</option>
					))}
				</select>
			</FormInputDiv>

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
				onClickHandler={handlePostGuiaDeViaje}
				validForm={true}
				value="Enviar"
			/>
		</FormDiv>
	);
};
