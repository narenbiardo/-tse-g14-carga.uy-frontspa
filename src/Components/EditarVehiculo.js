import { useState, useEffect } from "react";
import { ListaVehiculos } from "./ListaVehiculos";
import { Button } from "react-bootstrap";
import axios from "axios";

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

/*
const vehiculos = [
	new AgregarVehiculoForm(
		"ABC1234",
		"Chevrolet",
		"modelo1",
		"200.55",
		"400.90",
		new DtPermisoNacionalCirculacion("50", "2023-05-06", "2023-05-31"),
		"2023-11-28"
	),
	new AgregarVehiculoForm(
		"AAA1111",
		"Toyota",
		"modelo123",
		"333.00",
		"455.50",
		new DtPermisoNacionalCirculacion("99", "2023-01-16", "2024-12-24"),
		"2025-01-15"
	),
	new AgregarVehiculoForm(
		"BBB2222",
		"Kia",
		"modelo555",
		"555.55",
		"800.00",
		new DtPermisoNacionalCirculacion("1", "2020-08-22", "2025-02-01"),
		"2024-11-19"
	),
];
*/

export const EditarVehiculo = () => {
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);

	const handleMatriculaVehiculo = matricula => {
		setMatriculaVehiculo(matricula);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/vehiculosService/listarVehiculos")
			.then(response => {
				//console.log(response.data);
				setvehiculos(
					response.data.map(vehiculo => {
						const permisoCirculacion = new DtPermisoNacionalCirculacion(
							vehiculo.permisoCirculacion.numero,
							vehiculo.permisoCirculacion.fechaEmision,
							vehiculo.permisoCirculacion.fechaVencimiento
						);

						return new AgregarVehiculoForm(
							vehiculo.matricula,
							vehiculo.marcaVehiculo,
							vehiculo.modelo,
							vehiculo.capacidad.toString(),
							vehiculo.peso.toString(),
							permisoCirculacion,
							vehiculo.vencimientoITV
						);
					})
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return matriculaVehiculo == "" ? (
		<ListaVehiculos
			onMatriculaVehiculoChange={handleMatriculaVehiculo}
			vehiculosArray={vehiculos}
		/>
	) : (
		<>
			{/*Crear lógica de editar vehículo similar a agregar vehiculo*/}
			<p>{matriculaVehiculo}</p>
			<Button onClick={() => handleMatriculaVehiculo("")}>Volver</Button>
		</>
	);
};
