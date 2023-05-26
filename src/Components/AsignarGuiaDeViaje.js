import { useState } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { FormSelect } from "../Utilities/FormSelect";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";

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

const guiasDeViaje = [
	{ id: "1", nombre: "Guia 1" },
	{ id: "2", nombre: "Guia 2" },
	{ id: "3", nombre: "Guia 3" },
];

class AsignarGuiaViajeForm {
	constructor(idGuiaViaje, cedulaChofer, matriculaVehiculo) {
		this.idGuiaViaje = idGuiaViaje;
		this.cedulaChofer = cedulaChofer;
		this.matriculaVehiculo = matriculaVehiculo;
	}
}

export const AsignarGuiaDeViaje = () => {
	const [agvf, setAgvf] = useState(new AsignarGuiaViajeForm());

	const handleChangeAgvf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setAgvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAgvf(prevData => ({ ...prevData, ["matriculaVehiculo"]: e }));
		}
	};

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
						<button
							onClick={() => setAgvf(new AsignarGuiaViajeForm())}
							style={{
								marginRight: "100px",
								backgroundColor: "#16b7b9",
								color: "#fff",
								border: "none",
								padding: "10px 20px",
								borderRadius: "5px",
								fontSize: "16px",
							}}
						>
							Volver
						</button>
						<FormInputSubmit
							onClickHandler={() => console.log(agvf)}
							value="Enviar"
						/>
					</div>
				</>
			) : (
				<FormSelect
					htmlFor="idGuiaViaje"
					label="Guía de Viaje"
					name="idGuiaViaje"
					form="idGuiaViajeForm"
					onChangeHandler={handleChangeAgvf}
					optionDisabled="Seleccionar Guía de Viaje"
					valueArray={guiasDeViaje}
				/>
			)}
		</FormDiv>
	);
};
