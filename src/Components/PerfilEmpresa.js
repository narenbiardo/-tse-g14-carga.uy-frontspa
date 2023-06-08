import { useState, useEffect } from "react";
import axios from "axios";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";

export const PerfilEmpresa = () => {
	const [empresa, setEmpresa] = useState(
		new EmpresaDto(new DtDireccionEmpresa("", "", ""), "", "", "")
	);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/encargadoService/getEmpresa")
			.then(response => {
				setEmpresa(
					new EmpresaDto(
						response.data.direccionEmpresa,
						response.data.nombreEmpresa,
						response.data.nroEmpresa,
						response.data.razonSocial
					)
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<h4>Número: {empresa.nroEmpresa}</h4>
			<h4>Nombre: {empresa.nombreEmpresa}</h4>
			<h4>Dirección</h4>
			<h5>Calle: {empresa.direccionEmpresa.calle}</h5>
			<h5>Kilómetro: {empresa.direccionEmpresa.km}</h5>
			<h5>Número de puerta: {empresa.direccionEmpresa.nroPuerta}</h5>
			<h4>Razón social: {empresa.razonSocial}</h4>
		</>
	);
};
