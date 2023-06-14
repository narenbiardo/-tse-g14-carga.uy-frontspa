import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";
import { Button } from "react-bootstrap";
import { EditarEmpresa } from "./EditarEmpresa";
import { FormDiv } from "../Utilities/FormDiv";

export const PerfilEmpresa = () => {
	const [empresa, setEmpresa] = useState(
		new EmpresaDto(new DtDireccionEmpresa("", "", ""), "", "", "")
	);
	const [editar, setEditar] = useState(false);

	useEffect(() => {
		if (!editar) {
			axios
				.get(RESTEndpoints.encargadoService.getEmpresa)
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
		}
	}, [editar]);

	return editar ? (
		<FormDiv>
			<EditarEmpresa empresa={empresa} />
			<Button className="btn-secundario mt-2" onClick={() => setEditar(false)}>Volver</Button>
		</FormDiv>
	) : (
		<>
			<h4>Número: {empresa.nroEmpresa}</h4>
			<h4>Nombre: {empresa.nombreEmpresa}</h4>
			<h4>Razón social: {empresa.razonSocial}</h4>
			<h4>Dirección</h4>
			<h5>Calle: {empresa.direccionEmpresa.calle}</h5>
			<h5>Kilómetro: {empresa.direccionEmpresa.km}</h5>
			<h5>Número de puerta: {empresa.direccionEmpresa.nroPuerta}</h5>
			<Button className="btn-principal m-4" onClick={() => setEditar(true)}>Editar</Button>
		</>
	);
};
