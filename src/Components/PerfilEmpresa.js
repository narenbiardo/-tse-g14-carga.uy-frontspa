import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";
import { Button, Col, Container, Row } from "react-bootstrap";
import { EditarEmpresa } from "./EditarEmpresa";
import { FormDiv } from "../Utilities/FormDiv";
import {
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardText,
	MDBCardBody,
	MDBCardImage,
	MDBBtn,
	MDBBreadcrumb,
	MDBBreadcrumbItem,
	MDBProgress,
	MDBProgressBar,
	MDBIcon,
	MDBListGroup,
	MDBListGroupItem,
} from "mdb-react-ui-kit";
import { FormH2 } from "../Utilities/FormH2";

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
			<Button className="btn-secundario mt-2" onClick={() => setEditar(false)}>
				Volver
			</Button>
		</FormDiv>
	) : (
		<Container className="py-4 bg-white rounded-4 border border-secondary-subtle">
			<FormH2 text={"Empresa"}></FormH2>
			<MDBCol lg="12">
				<MDBCard className="mb-4">
					<MDBCardBody>
						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Número</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.nroEmpresa}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
						<hr />
						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Nombre</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.nombreEmpresa}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
						<hr />
						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Razón social</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.razonSocial}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
						<hr />

						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Calle</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.direccionEmpresa.calle}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
						<hr />

						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Kilómetro</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.direccionEmpresa.km}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
						<hr />

						<MDBRow>
							<MDBCol sm="3">
								<MDBCardText>Número de puerta</MDBCardText>
							</MDBCol>
							<MDBCol sm="9" className="text-center">
								<MDBCardText className="text-muted">
									{empresa.direccionEmpresa.nroPuerta}
								</MDBCardText>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>

			{/*<h4>Número: {empresa.nroEmpresa}</h4>
			<h4>Nombre: {empresa.nombreEmpresa}</h4>
			<h4>Razón social: {empresa.razonSocial}</h4>
			<h4>Dirección</h4>
			<h5>Calle: {empresa.direccionEmpresa.calle}</h5>
			<h5>Kilómetro: {empresa.direccionEmpresa.km}</h5>
			<h5>Número de puerta: {empresa.direccionEmpresa.nroPuerta}</h5>*/}
			<Button className="btn-principal m-4" onClick={() => setEditar(true)}>
				Editar
			</Button>
		</Container>
	);
};
