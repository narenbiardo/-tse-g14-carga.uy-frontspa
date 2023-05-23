import { useState, useEffect } from "react";

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
			<h2 style={{ color: "#16b7b9" }}>Ingresar Guía de Viaje</h2>
			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="rubro">Rubro</label>
				<select
					name="rubro"
					form="rubroForm"
					onChange={handleChangeIgvf}
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
						Seleccionar rubro
					</option>
					<option value={0}>Alimentos, bebida, tabaco</option>
					<option value={1}>Industria frigorifica</option>
					<option value={2}>Pesca</option>
				</select>
			</div>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="volumen">Volumen</label>
				<input
					type="number"
					name="volumen"
					step="0.01"
					onChange={handleChangeIgvf}
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
				<label htmlFor="fechaHora">Fecha y Hora</label>
				<input
					type="datetime-local"
					name="fechaHora"
					min={new Date().toISOString().slice(0, 16)}
					onChange={handleChangeIgvf}
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
				<label htmlFor="nroEmpresa">Número de la Empresa</label>
				<input
					type="text"
					name="nroEmpresa"
					onChange={handleChangeIgvf}
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

			<h4 style={{ color: "#16b7b9" }}>Dirección de Origen</h4>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="calleOrigen">Calle</label>
				<input
					type="text"
					name="calleOrigen"
					onChange={handleChangeDtddpo}
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
				<label htmlFor="nroPuertaOrigen">Número de Puerta</label>
				<input
					type="text"
					name="nroPuertaOrigen"
					onChange={handleChangeDtddpo}
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
				<label htmlFor="kmOrigen">Kilómetro</label>
				<input
					type="text"
					name="kmOrigen"
					onChange={handleChangeDtddpo}
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
				<label htmlFor="departamentoOrigen">Departamento</label>
				<select
					name="departamentoOrigen"
					form="departamentoOrigenForm"
					onChange={handleChangeDtddpo}
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
						Seleccionar departamento
					</option>
					<option value={0}>Montevideo</option>
					<option value={1}>Canelones</option>
					<option value={2}>Rocha</option>
				</select>
			</div>

			<h4 style={{ color: "#16b7b9" }}>Dirección de Destino</h4>

			<div style={{ marginBottom: "10px" }}>
				<label htmlFor="calleDestino">Calle</label>
				<input
					type="text"
					name="calleDestino"
					onChange={handleChangeDtddpd}
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
				<label htmlFor="nroPuertaDestino">Número de Puerta</label>
				<input
					type="text"
					name="nroPuertaDestino"
					onChange={handleChangeDtddpd}
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
				<label htmlFor="kmDestino">Kilómetro</label>
				<input
					type="text"
					name="kmDestino"
					onChange={handleChangeDtddpd}
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
				<label htmlFor="departamentoDestino">Departamento</label>
				<select
					name="departamentoDestino"
					form="departamentoDestinoForm"
					onChange={handleChangeDtddpd}
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
						Seleccionar departamento
					</option>
					<option value={0}>Montevideo</option>
					<option value={1}>Canelones</option>
					<option value={2}>Rocha</option>
				</select>
			</div>

			<button
				onClick={() => console.log(igvf)}
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
	);
};
