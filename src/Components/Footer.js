import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SvgLogo } from "../Utilities/SvgLogo";
import '../css/styles.css';

const Footer = () => {
	return (
		<footer
		className="footer"

		>
		<Container>
			<Row className="align-items-center">
			<Col md={3} className="text-center">
				<SvgLogo color="#b2b2b2" dataName="Layer 2" />
			</Col>
			<Col md={6} className="text-center">
				<p style={{ marginBottom: "0.5rem" }}>© 2023 Carga.uy</p>
				<p style={{ marginBottom: "0.5rem" }}>
				Todos los derechos reservados.
				</p>
			</Col>
			<Col md={3} className="text-center">
				<a href="https://play.google.com/store/apps/details?id=com.carga.uy">
				<img
					src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"
					alt="Disponible en Google Play"
					height="50"
				/>
				</a>
			</Col>
			</Row>
		</Container>
		</footer>

	);
};

export default Footer;
