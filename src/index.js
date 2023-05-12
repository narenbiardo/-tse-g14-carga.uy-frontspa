import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"; //Necesario para el estilizado de boostrap
import { Container, Row, Col } from "react-bootstrap";
import App from "./App";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Container fluid>
			<App></App>
			{/*<Row className="justify-content-center align-items-center">
				<Col xs={3}>
					<Login />
				</Col>
			</Row>*/}
		</Container>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
