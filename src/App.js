import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAuth, AuthProvider } from "./Services/useAuth";
import { NavBarCustom } from "./Components/NavBarCustom";
import { IngresarGuiaDeViaje } from "./Components/IngresarGuiaDeViaje";
import Footer from "./Components/Footer";
import { AsignarGuiaDeViaje } from "./Components/AsignarGuiaDeViaje";
import { AgregarVehiculo } from "./Components/AgregarVehiculo";
import { EditarVehiculo } from "./Components/EditarVehiculo";
import { Perfil } from "./Components/Perfil";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Home } from "./Components/Home";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
};

const ProtectedRouteEncargado = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user === 1) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
};

const ProtectedRouteFuncionario = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user === 2) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
};

const ProtectedPerfil = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && (user === 1 || user === 2)) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
};

function App() {
	return (
		<AuthProvider>
			<NavBarCustom />
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					{/*<Route path="/login" element={<Login />}></Route>*/}
					<Route
						path="/perfil"
						element={
							<ProtectedPerfil>
								<Perfil />
							</ProtectedPerfil>
						}
					/>
					<Route
						path="/empresa"
						element={
							<ProtectedRouteEncargado>
								<h1>Perfil Empresa</h1>
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="/ingresarGuiaDeViaje"
						element={
							<ProtectedRouteEncargado>
								<IngresarGuiaDeViaje />
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="/asignarGuiaDeViaje"
						element={
							<ProtectedRouteEncargado>
								<AsignarGuiaDeViaje />
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="/agregarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<AgregarVehiculo />
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="/editarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<EditarVehiculo />
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="/eliminarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<h1>Eliminar Vehículo</h1>
							</ProtectedRouteEncargado>
						}
					/>
					<Route path="*" element={<h1>Not found</h1>} />
				</Routes>
			</div>
			<Footer />
		</AuthProvider>
	);
}

export default App;
