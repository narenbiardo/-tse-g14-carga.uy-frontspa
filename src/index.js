import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"; //Necesario para el estilizado de boostrap
import { Container, Row, Col } from "react-bootstrap";
import App from "./App";
import Login from "./Login";

// Agrega las etiquetas <link> para las fuentes de Google Fonts
const link1 = document.createElement("link");
link1.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Quicksand:wght@300;400;500&family=Roboto:wght@300&display=swap";
link1.rel = "stylesheet";

const link2 = document.createElement("link");
link2.href = "https://fonts.gstatic.com";
link2.rel = "preconnect";
link2.crossOrigin = true;

const link3 = document.createElement("link");
link3.href = "https://fonts.googleapis.com";
link3.rel = "preconnect";

document.head.appendChild(link1);
document.head.appendChild(link2);
document.head.appendChild(link3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
