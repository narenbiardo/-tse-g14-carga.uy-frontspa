import { useState } from "react";
import { FormDiv } from "../Utilities/FormDiv";
import { Table } from "react-bootstrap";
import { mainColor } from "../constants";

export const ListaVehiculos = ({
	onMatriculaVehiculoChange,
	vehiculosArray,
}) => {
	const [filaResaltada, setFilaResaltada] = useState(null);

	const handleMouseEnter = index => {
		setFilaResaltada(index);
	};

	const handleMouseLeave = () => {
		setFilaResaltada(null);
	};
	return (
		<Table size="sm" striped bordered hover responsive>
			<thead>
				<tr>
					<th>Matrícula</th>
					<th>Marca</th>
					<th>Modelo</th>
					<th>Peso</th>
					<th>Capacidad</th>
					<th>Vencimiento ITV</th>
					<th>#PNC</th>
					<th>Emisión PNC</th>
					<th>Vencimiento PNC</th>
				</tr>
			</thead>
			<tbody>
				{vehiculosArray.map((v, index) => (
					<tr
						key={v.matricula}
						onClick={() => onMatriculaVehiculoChange(v)}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
						style={{
							cursor: "pointer",
							backgroundColor:
								filaResaltada === index ? mainColor : "transparent",
						}}
					>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.matricula}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.marcaVehiculo}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.modelo}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.peso}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.capacidad}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.vencimientoITV}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.permisoCirculacion.numero}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.permisoCirculacion.fechaEmision}
						</td>
						<td
							style={{
								color: filaResaltada === index ? "#fff" : "inherit",
							}}
						>
							{v.permisoCirculacion.fechaVencimiento}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
