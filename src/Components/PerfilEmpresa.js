import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";
import { Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import { EditarEmpresa } from "./EditarEmpresa";
import {
	MDBCol,
	MDBRow,
	MDBCard,
	MDBCardText,
	MDBCardBody,
} from "mdb-react-ui-kit";
import { FormH4 } from "../Utilities/FromH4";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from "@mui/icons-material/Edit";

export const PerfilEmpresa = () => {
	const [empresa, setEmpresa] = useState(
		new EmpresaDto(new DtDireccionEmpresa("", "", ""), "", "", "")
	);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleEditEmpresa = (event, edto) => {
		event.preventDefault();
		setLoading(true);
		axios
			.put(RESTEndpoints.encargadoService.modEmpresa, edto)
			.then(response => {
				setLoading(false);
				handleCloseDialog();
				Swal.fire({
					title: 'Confirmado',
					timer: 2500,
					text: 'La empresa fue modificada con éxito!',
					icon: 'success',
					confirmButtonText: 'Aceptar',
				});
			})
			.catch(error => {
				setLoading(false);
				handleCloseDialog();
				let errorMessage = 'Ha ocurrido un error, vuelva a intentarlo';

				if (error.response && error.response.data) {
					errorMessage = `${error.response.data}`;
				}

				Swal.fire({
					text: errorMessage,
					title: 'Error',
					icon: 'error',
					confirmButtonText: 'Aceptar',
				});
			});
	};

	useEffect(() => {
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
	}, [loading]);

	return (
		<Container className="form-container shadow-dreamy align-items-start">
			<div className="d-inline-flex">
				<FormH4 text={"Empresa"} />
				<EditIcon onClick={() => setIsOpen(true)} className="mt-5 mx-3 edit-icon"/>
			</div>
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

			{isOpen && (
				<Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth classes={{ paper: 'border-14' }}>
					<DialogTitle className="dialog-title">Editar Empresa</DialogTitle>
					<DialogContent className="dialog">
						<EditarEmpresa
							empresa={empresa}
							handleEditEmpresa={(event, edto) => handleEditEmpresa(event, edto)}
						/>
					</DialogContent>
					<DialogActions>
							<Button
								type="submit"
								variant="contained"
								size="medium"
								className="dialog-confirm-btn"
								startIcon={loading ? <CircularProgress size={20} /> : <CheckIcon />}
								disabled={loading}
								form="editar-empresa-form"
							>
								EDITAR
							</Button>
							<Button
								variant="outlined"
								size="medium"
								className="dialog-close-btn"
								startIcon={<CloseIcon />}
								onClick={handleCloseDialog}
							>
								CERRAR
							</Button>
						</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
