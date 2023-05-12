import { useState } from "react";

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

	const handleChangeIgvf = e => {
		const { name, value } = e.target;
		setIgvf(prevData => ({ ...prevData, [name]: value }));
		var newIgvf = new IngresarGuiaViajeForm(
			0,
			15.0,
			"15/19/2015",
			"4214213",
			"4214213",
			34
		);
	};

	return (
		<div>
			<label htmlFor="rubro">Rubro</label>
			<select
				name="rubro"
				form="rubroForm"
				id="rubro"
				onChange={handleChangeIgvf}
			>
				<option value={0}>Alimentos, bebida, tabaco</option>
				<option value={1}>Industria frigorifica</option>
				<option value={2}>Pesca</option>
			</select>
			<br />
			<label htmlFor="volumen">Volumen</label>
			<input type="number" step="0.01" id="volumen"></input>
			<br />
			<label htmlFor="fechaHora">fechaHora</label>
			<input
				type="datetime-local"
				id="fechaHora"
				name="meeting-time"
				value={new Date().toISOString().slice(0, 16)}
				min={new Date().toISOString().slice(0, 16)}
			></input>
			<br />
			<input type="" name="name" onChange={handleChangeIgvf} />
			<input type="text" name="email" onChange={handleChangeIgvf} />
			<button onClick={() => console.log(igvf)}>Enviar</button>
		</div>
	);
};
