import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import '../../css/styles.css';

Modal.setAppElement("#root");

export const ErrorModalPublicUser = ({ user }) => {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	return (
		<Modal
			isOpen={user === 0 && show}
			className="custom-modal-content"
			contentLabel="Example Modal"
		>
			<div className="mb-3">
				Para utilizar la aplicación, su cuenta debe tener asignado un rol, por
				favor contactate con un administrador.
			</div>
			<Button className="btn-secundario" onClick={handleClose}>Cerrar</Button>
		</Modal>
	);
};
