import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";

Modal.setAppElement("#root");

const modalStyle = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export const ErrorModalPublicUser = ({ user }) => {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	return (
		<Modal
			isOpen={user === 0 && show}
			style={modalStyle}
			contentLabel="Example Modal"
		>
			<div>
				Para utilizar la aplicación, su cuenta debe tener asignado un rol, por
				favor contactate con un administrador.
			</div>
			<Button onClick={handleClose}>Cerrar</Button>
		</Modal>
	);
};
