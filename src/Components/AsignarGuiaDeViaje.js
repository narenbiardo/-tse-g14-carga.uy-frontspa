import { useState } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

const vehiculos = [
	"ABC1111",
	"ABC2222",
	"ABC3333",
	"ABC4444",
	"ABC5555",
	"ABC6666",
	"ABC7777",
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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
				backgroundColor: "#fff",
				borderRadius: "5px",
				boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			}}
		>
			<h2 style={{ color: "#16b7b9" }}>Asignar Guía de Viaje</h2>

			{agvf.idGuiaViaje ? (
				<>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor="cedulaChofer">Chofer</label>
						<select
							name="cedulaChofer"
							form="cedulaChoferForm"
							onChange={handleChangeAgvf}
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
							<option value="" selected disabled>
								Seleccionar Chofer
							</option>
							<option value={0}>Marcos</option>
							<option value={1}>Alberto</option>
							<option value={2}>Carlos</option>
						</select>
					</div>

					<div style={{ marginBottom: "10px", position: "relative" }}>
						<label htmlFor="matriculaVehiculo">Vehículo</label>
						{
							<TextInput
								name="matriculaVehiculo"
								form="vehiculoForm"
								onChange={handleChangeAgvf}
								options={vehiculos}
								maxOptions={5}
								trigger=""
								Component="input"
								spacer=""
								style={{
									marginLeft: "10px",
									padding: "5px",
									border: "none",
									borderBottom: "2px solid #16b7b9",
									width: "250px",
									fontSize: "16px",
									color: "#555",
								}}
							/>
						}
					</div>

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
						<input
							onClick={() => console.log(agvf)}
							type="submit"
							value="Enviar"
							style={{
								backgroundColor: "#16b7b9",
								color: "#fff",
								border: "none",
								padding: "10px 20px",
								borderRadius: "5px",
								fontSize: "16px",
							}}
						/>
					</div>
				</>
			) : (
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="idGuiaViaje">Guía de Viaje</label>
					<select
						name="idGuiaViaje"
						form="idGuiaViajeForm"
						onChange={handleChangeAgvf}
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
						<option value="" selected disabled>
							Seleccionar Guía de Viaje
						</option>
						<option value={0}>Guía 1</option>
						<option value={1}>Guía 2</option>
						<option value={2}>Guía 3</option>
					</select>
				</div>
			)}
		</div>
	);
};
