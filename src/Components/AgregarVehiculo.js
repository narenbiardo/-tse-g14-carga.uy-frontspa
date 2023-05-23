import { useState, useEffect } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

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
			<h2 style={{ color: "#16b7b9" }}>Agregar Vehículo</h2>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="matricula">Matricula</label>
				<input
					type="text"
					name="matricula"
					onChange={handleChangeAvf}
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
			</div>

			<div style={{ marginBottom: "10px", position: "relative" }}>
				<label htmlFor="marca">Marca</label>
				{
					<TextInput
						name="marca"
						form="marcaForm"
						onChange={handleChangeAvf}
						options={marcasVehiculos}
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

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="modelo">Modelo</label>
				<input
					type="text"
					name="modelo"
					onChange={handleChangeAvf}
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
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="peso">Peso</label>
				<input
					type="number"
					name="peso"
					step="0.01"
					onChange={handleChangeAvf}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="capacidad">Capacidad</label>
				<input
					type="number"
					name="capacidad"
					step="0.01"
					onChange={handleChangeAvf}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="vencimientoITV">
					Fecha de Vencimiento de la Inspección Técnica Vehicular
				</label>
				<input
					type="date"
					name="vencimientoITV"
					min={new Date().toISOString().slice(0, 16)}
					onChange={handleChangeAvf}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<h4 style={{ color: "#16b7b9" }}>Permiso Nacional de Circulación</h4>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="numero">Número</label>
				<input
					type="number"
					name="numero"
					onChange={handleChangeDtpnc}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="fechaEmision">Fecha de Emision</label>
				<input
					type="date"
					name="fechaEmision"
					max={new Date().toISOString().split("T")[0]}
					onChange={handleChangeDtpnc}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
				<input
					type="date"
					name="fechaVencimiento"
					min={new Date().toISOString().split("T")[0]}
					onChange={handleChangeDtpnc}
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				></input>
			</div>

			<div>
				<input
					onClick={() => console.log(avf)}
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
		</div>
	);
};
