import logo from "./logo.svg";
import "./App.css";
import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./useAuth";
import { useState } from "react";
import { NavBarCustom } from "./Components/NavBarCustom";
import { IngresarGuiaDeViaje } from "./Components/IngresarGuiaDeViaje";
import Footer from "./Components/Footer";
import { AuthorizationCodeExample } from "./Services/Outh2Prueba";
import { AsignarGuiaDeViaje } from "./Components/AsignarGuiaDeViaje";
import { AgregarVehiculo } from "./Components/AgregarVehiculo";

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

	if (isAuthenticated && user == 1) {
		return children;
	} else {
		return <Navigate to={"/"}></Navigate>;
	}
};

const ProtectedRouteFuncionario = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	if (isAuthenticated && user == 2) {
		return children;
	} else {
		return <Navigate to={"/"}></Navigate>;
	}
};

const Home = () => <h1>Home</h1>;
const Login = () => {
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

function App() {
	return (
		<AuthProvider>
			<NavBarCustom />
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route
						path="/outh2Prueba"
						element={<AuthorizationCodeExample></AuthorizationCodeExample>}
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
					<Route path="*" element={<h1>Not found</h1>}></Route>
				</Routes>
			</div>
			<Footer></Footer>
		</AuthProvider>
	);
}

export default App;
