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
		<div>
			<label htmlFor="rubro">Rubro</label>
			<select name="rubro" form="rubroForm" onChange={handleChangeIgvf}>
				<option value="" selected disabled>
					Seleccionar rubro
				</option>
				<option value={0}>Alimentos, bebida, tabaco</option>
				<option value={1}>Industria frigorifica</option>
				<option value={2}>Pesca</option>
			</select>
			<br />
			<label htmlFor="volumen">Volumen</label>
			<input
				type="number"
				name="volumen"
				step="0.01"
				onChange={handleChangeIgvf}
			></input>
			<br />
			<label htmlFor="fechaHora">fechaHora</label>
			<input
				type="datetime-local"
				name="fechaHora"
				min={new Date().toISOString().slice(0, 16)}
				onChange={handleChangeIgvf}
			></input>
			<br />
			<p>Ingresar origen</p>
			<label htmlFor="calleOrigen">Calle Origen</label>
			<input type="text" name="calleOrigen" onChange={handleChangeDtddpo} />
			<label htmlFor="nroPuertaOrigen">Número de puerta origen</label>
			<input type="text" name="nroPuertaOrigen" onChange={handleChangeDtddpo} />
			<label htmlFor="kmOrigen">Kilometro origen</label>
			<input type="text" name="kmOrigen" onChange={handleChangeDtddpo} />
			<label htmlFor="departamentoOrigen">Departamento origen</label>
			<select
				name="departamentoOrigen"
				form="departamentoOrigenForm"
				onChange={handleChangeDtddpo}
			>
				<option value="" selected disabled>
					Seleccionar departamento
				</option>
				<option value={0}>Montevideo</option>
				<option value={1}>Canelones</option>
				<option value={2}>Rocha</option>
			</select>

			<br />
			<p>Ingresar destino</p>
			<label htmlFor="calleDestino">Calle destino</label>
			<input type="text" name="calleDestino" onChange={handleChangeDtddpd} />
			<label htmlFor="nroPuertaDestino">Número de puerta destino</label>
			<input
				type="text"
				name="nroPuertaDestino"
				onChange={handleChangeDtddpd}
			/>
			<label htmlFor="kmDestino">Kilometro destino</label>
			<input type="text" name="kmDestino" onChange={handleChangeDtddpd} />
			<label htmlFor="departamentoDestino">Departamento destino</label>
			<select
				name="departamentoDestino"
				form="departamentoDestinoForm"
				onChange={handleChangeDtddpd}
			>
				<option value="" selected disabled>
					Seleccionar departamento
				</option>
				<option value={0}>Montevideo</option>
				<option value={1}>Canelones</option>
				<option value={2}>Rocha</option>
			</select>

			<br />
			<label htmlFor="nroEmpresa">Número empresa</label>
			<input type="text" name="nroEmpresa" onChange={handleChangeIgvf} />
			<button onClick={() => console.log(igvf)}>Enviar</button>
		</div>
	);
};
