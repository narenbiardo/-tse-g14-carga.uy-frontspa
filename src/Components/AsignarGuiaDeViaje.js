import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { FormSelect } from "../Utilities/FormSelect";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { Button } from "react-bootstrap";

const vehiculos = [
	"ABC1111",
	"ABC2222",
	"ABC3333",
	"ABC4444",
	"ABC5555",
	"ABC6666",
	"ABC7777",
];

const choferes = [
	{ id: "123", nombre: "Marcos" },
	{ id: "456", nombre: "Gabriel" },
	{ id: "789", nombre: "Lucas" },
];

/*
const guiasDeViaje = [
	{ id: "1", nombre: "Guia 1" },
	{ id: "2", nombre: "Guia 2" },
	{ id: "3", nombre: "Guia 3" },
];
*/

class AsignarGuiaViajeForm {
	constructor(idGuiaViaje, cedulaChofer, matriculaVehiculo) {
		this.idGuiaViaje = idGuiaViaje;
		this.cedulaChofer = cedulaChofer;
		this.matriculaVehiculo = matriculaVehiculo;
	}
}

export const AsignarGuiaDeViaje = () => {
	const [agvf, setAgvf] = useState(new AsignarGuiaViajeForm());
	const [guiasDeViaje, setGuiasDeViaje] = useState([]);
	//const [vehiculos, setVehiculos] = useState([]);

	const handleChangeAgvf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setAgvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAgvf(prevData => ({ ...prevData, ["matriculaVehiculo"]: e }));
		}
	};

	const handleGuiasDeViaje = () => {
		axios
			.get(RESTEndpoints.guiasViajesService.listarGuiasAsignables)
			.then(response => {
				//console.log(response.data);
				setGuiasDeViaje(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	/*
	const handleVehiculos = () => {
		axios
			.get(RESTEndpoints.encargadoService.vehiculos)
			.then(response => {
				console.log(response.data);
				setVehiculos(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};
	*/

	useEffect(() => {
		handleGuiasDeViaje();
		//handleVehiculos();
	}, []);

	return (
		<FormDiv>
			<FormH2 text="Asignar Guía de Viaje" />

			{agvf.idGuiaViaje ? (
				<>
					<FormSelect
						htmlFor="cedulaChofer"
						label="Chofer"
						name="cedulaChofer"
						form="cedulaChoferForm"
						onChangeHandler={handleChangeAgvf}
						optionDisabled="Seleccionar Chofer"
						valueArray={choferes}
					/>

					<FormTextInputAutocomplete
						htmlFor="matriculaVehiculo"
						label="Vehículo"
						name="matriculaVehiculo"
						form="vehiculoForm"
						onChangeHandler={handleChangeAgvf}
						optionArray={vehiculos}
						maxOptionNumber={5}
					/>

					<div>
						<Button type="submit" className="btn-principal submit mt-2 mb-2">
							{" "}
							Enviar{" "}
						</Button>
					</div>

					<div>
						<Button type="submit" className="btn-secundario submit mt-2 mb-2">
							{" "}
							Volver{" "}
						</Button>
					</div>
					{/* 						
						<button
							onClick={() => setAgvf(new AsignarGuiaViajeForm())}
							className="btn-secundario m-3"
						>
							Volver
						</button> */}

					{/* //</div> */}
				</>
			) : (
				<FormInputDiv>
					<label htmlFor="idGuiaViaje">Guía de Viaje</label>
					<select
						name="idGuiaViaje"
						form="idGuiaViajeForm"
						onChange={handleChangeAgvf}
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
							"Seleccionar Guía de Viaje"
						</option>
						{guiasDeViaje.map(gv => (
							<option value={gv.idGuiaViaje} key={Math.random()}>
								{"Calle: " +
									gv.destino.calle +
									", Km: " +
									gv.destino.km +
									", Nº Puerta: " +
									gv.destino.nroPuerta +
									", Fecha: " +
									new Date(gv.fechaHora).toLocaleString()}
							</option>
						))}
					</select>
				</FormInputDiv>
				/*<FormSelect
					htmlFor="idGuiaViaje"
					label="Guía de Viaje"
					name="idGuiaViaje"
					form="idGuiaViajeForm"
					onChangeHandler={handleChangeAgvf}
					optionDisabled="Seleccionar Guía de Viaje"
					valueArray={guiasDeViaje}
				/>*/
			)}
		</FormDiv>
	);
};
