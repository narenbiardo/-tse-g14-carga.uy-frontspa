import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import {
	Route,
	Routes,
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
import { ConsultarVehiculo } from "./Components/ConsultarVehiculo";
import { Perfil } from "./Components/Perfil";
import cookies from "js-cookie";
import { axiosHeadersAuth, axiosHeadersAccept } from "./Services/RestService";
import { Home } from "./Components/Home";
import { PerfilEmpresa } from "./Components/PerfilEmpresa";
import { AñadirEmpresa } from "./Components/AñadirEmpresa";
import { PermisosVehiculos } from "./Components/PermisosVehıculos";
import "react-toastify/dist/ReactToastify.css";
import "./css/animations.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "@fortawesome/fontawesome-svg-core/styles.css";

axiosHeadersAuth();
axiosHeadersAccept();
console.log(cookies.get("code"));

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

const defaultTheme = createTheme();

function App() {	
	return (
		<ThemeProvider theme={defaultTheme}>
		<Box
		  sx={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		  }}
		>
		  <CssBaseline />
		  <AuthProvider>
			<NavBarCustom/>
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
								<PerfilEmpresa />
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
						path="/consultarVehiculos"
						element={
							<ProtectedRouteEncargado>
								<ConsultarVehiculo />
							</ProtectedRouteEncargado>
						}
					/>
					<Route
						path="empresas"
						element={
							<ProtectedRouteFuncionario>
								<AñadirEmpresa />
							</ProtectedRouteFuncionario>
						}
					/>
					<Route
						path="vehiculos"
						element={
							<ProtectedRouteFuncionario>
								<PermisosVehiculos />
							</ProtectedRouteFuncionario>
						} 
					/>
					<Route path="*" element={<h1>Not found</h1>} />
				</Routes>
			</div>
		</AuthProvider>
		
		<Box
			component="footer"
			sx={{
			  py: 3,
			  px: 2,
			  mt: 'auto',
			  backgroundColor: '#212529',

			}}
		  >
			<Container maxWidth="sm">
				<Footer/>
			</Container>
		  </Box>
		</Box>
	  </ThemeProvider>
  
		
	);
}

export default App;



