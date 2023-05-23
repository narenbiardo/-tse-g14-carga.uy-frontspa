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

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return children;
	} else {
		return <Navigate to={"/login"}></Navigate>;
	}
};

const Home = () => <h1>Home</h1>;
const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleClick = () => {
		login();
		navigate("/");
	};

	return <Button onClick={handleClick}>Login</Button>;
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
							<ProtectedRoute>
								<IngresarGuiaDeViaje />
							</ProtectedRoute>
						}
					></Route>
					<Route
						path="/asignarGuiaDeViaje"
						element={
							<ProtectedRoute>
								<AsignarGuiaDeViaje />
							</ProtectedRoute>
						}
					></Route>
					<Route
						path="/usuarioLog"
						element={
							<ProtectedRoute>
								<h1>Usuario logueado</h1>
							</ProtectedRoute>
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
