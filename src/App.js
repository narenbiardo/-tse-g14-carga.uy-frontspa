import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useLayoutEffect } from "react";
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
import { AuthorizationCodeExample } from "./Services/Outh2Prueba";
import { AsignarGuiaDeViaje } from "./Components/AsignarGuiaDeViaje";
import { AgregarVehiculo } from "./Components/AgregarVehiculo";
import { EditarVehiculo } from "./Components/EditarVehiculo";
import { Login } from "./Services/LoginGubUy";
import cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return children;
	} else {
		return <Navigate to={"/login"}></Navigate>;
	}
};

const ProtectedRouteEncargado = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user === 1) {
		return children;
	} else {
		return <Navigate to={"/"}></Navigate>;
	}
};

const ProtectedRouteFuncionario = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user === 2) {
		return children;
	} else {
		return <Navigate to={"/"}></Navigate>;
	}
};

const ProtectedPerfil = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user === 1) {
		return <h1>Perfil Encargado</h1>;
	} else if (isAuthenticated && user === 2) {
		return <h1>Perfil Funcionario</h1>;
	} else {
		return <Navigate to={"/login"}></Navigate>;
	}
};

const Home = () => <h1>Home</h1>;
const LoginOld = () => {
	const { login } = useAuth();
	const { loginEncargado } = useAuth();
	const { loginFuncionario } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		login();
		navigate("/");
	};

	const handleClickEncargado = () => {
		loginEncargado();
		navigate("/");
	};

	const handleClickFuncionario = () => {
		loginFuncionario();
		navigate("/");
	};

	return (
		<>
			<Button onClick={handleClick}>Login</Button>
			<Button onClick={handleClickEncargado}>Login Encargado</Button>
			<Button onClick={handleClickFuncionario}>Login Funcionario</Button>
		</>
	);
};

const LoginFromCookie = () => {
	const { login } = useAuth();
	const code = cookies.get("code");

	useEffect(() => {
		if (code) {
			login(code);
		}

		console.log(code);
	}, [code]);
};

function App() {
	return (
		<AuthProvider>
			<NavBarCustom />
			<div className="App">
				<LoginFromCookie />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					{/*<Route path="/login" element={<Login />}></Route>*/}
					<Route
						path="/outh2Prueba"
						element={<AuthorizationCodeExample></AuthorizationCodeExample>}
					></Route>
					<Route
						path="/perfil"
						element={
							<>
								<ProtectedPerfil />
							</>
						}
					></Route>
					<Route
						path="/empresa"
						element={
							<ProtectedRouteEncargado>
								<h1>Perfil Empresa</h1>
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route
						path="/ingresarGuiaDeViaje"
						element={
							<ProtectedRouteEncargado>
								<IngresarGuiaDeViaje />
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route
						path="/asignarGuiaDeViaje"
						element={
							<ProtectedRouteEncargado>
								<AsignarGuiaDeViaje />
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route
						path="/agregarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<AgregarVehiculo />
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route
						path="/editarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<EditarVehiculo />
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route
						path="/eliminarVehiculo"
						element={
							<ProtectedRouteEncargado>
								<h1>Eliminar Vehículo</h1>
							</ProtectedRouteEncargado>
						}
					></Route>
					<Route path="*" element={<h1>Not found</h1>}></Route>
				</Routes>
			</div>
			<Footer />
		</AuthProvider>
	);
}

export default App;
