import { useState } from "react";

class DtDireccionPostal {
	//si se le crea un constructor, luego creará objetos dobles. Mejor no crear uno por ahora
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
		insertName.replace("Origen", "");
		setDtddpo(prevData => ({ ...prevData, [insertName]: value }));
		setIgvf(prevData => ({ ...prevData, ["origen"]: dtddpo }));
	};

	const handleChangeDtddpd = e => {
		const { name, value } = e.target;
		var insertName = name;
		insertName.replace("Destino", "");
		setDtddpd(prevData => ({ ...prevData, [insertName]: value }));
		setIgvf(prevData => ({ ...prevData, ["destino"]: dtddpd }));
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
			<h2 style={{ color: "#16b7b9" }}>Formulario de Registro</h2>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="nombre">Nombre:</label>
				<input
					type="text"
					id="nombre"
					name="nombre"
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
				<label htmlFor="email">Correo Electrónico:</label>
				<input
					type="email"
					id="email"
					name="email"
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
				<label htmlFor="telefono">Teléfono:</label>
				<input
					type="tel"
					id="telefono"
					name="telefono"
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
			<h3 style={{ color: "#16b7b9" }}>Dirección de Origen</h3>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="calle">Calle:</label>
				<input
					type="text"
					id="calle"
					name="calle"
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
				<label htmlFor="numero">Número:</label>
				<input
					type="text"
					id="numero"
					name="numero"
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "100px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="colonia">Colonia:</label>
				<input
					type="text"
					id="colonia"
					name="colonia"
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid#16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="cp">Código Postal:</label>
				<input
					type="text"
					id="cp"
					name="cp"
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "100px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="ciudad">Ciudad:</label>
				<input
					type="text"
					id="ciudad"
					name="ciudad"
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
				<label htmlFor="estado">Estado:</label>
				<input
					type="text"
					id="estado"
					name="estado"
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
			<h3 style={{ color: "#16b7b9" }}>Dirección de Destino</h3>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="calleDestino">Calle:</label>
				<input
					type="text"
					id="calleDestino"
					name="calleDestino"
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
				<label htmlFor="numeroDestino">Número:</label>
				<input
					type="text"
					id="numeroDestino"
					name="numeroDestino"
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "100px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="coloniaDestino">Colonia:</label>
				<input
					type="text"
					id="coloniaDestino"
					name="coloniaDestino"
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
				<label htmlFor="cpDestino">Código Postal:</label>
				<input
					type="text"
					id="cpDestino"
					name="cpDestino"
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "100px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</div>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="ciudadDestino">Ciudad:</label>
				<input
					type="text"
					id="ciudadDestino"
					name="ciudadDestino"
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
				<label htmlFor="estadoDestino">Estado:</label>
				<input
					type="text"
					id="estadoDestino"
					name="estadoDestino"
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
			<div style={{ marginTop: "20px" }}>
				<button
					style={{
						backgroundColor: "#16b7b9",
						color: "#fff",
						border: "none",
						padding: "10px 20px",
						borderRadius: "5px",
						fontSize: "16px",
					}}
				>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default IngresarGuiaDeViaje;
