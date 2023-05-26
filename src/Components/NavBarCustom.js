import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "../useAuth";
import { Logout } from "../Utilities/Logout";
import { IngresarGuiaDeViaje } from "./IngresarGuiaDeViaje";
import { SvgLogo } from "../Utilities/SvgLogo";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();

	const navigate = useNavigate();

	const handleBrandClick = () => {
		navigate("/");
	};

	return (
		<Navbar bg="white" expand="lg" className="shadow-sm">
			<Container>
				<Navbar.Brand onClick={handleBrandClick} style={{ cursor: "pointer" }}>
					<SvgLogo color="#16b7b9" dataName="Layer 1" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated && user == 1 && (
							<>
								<NavLink to="/ingresarGuiaDeViaje" className="nav-link">
									Ingresar Guía de Viaje
								</NavLink>
								<NavLink to="/asignarGuiaDeViaje" className="nav-link">
									Asignar Guía de Viaje
								</NavLink>
								<NavLink to="/agregarVehiculo" className="nav-link">
									Agregar Vehiculo
								</NavLink>
							</>
						)}
					</Nav>
					<Nav className="ms-auto">
						{isAuthenticated ? (
							<Logout />
						) : (
							<NavLink
								to="/login
							"
								className="nav-link"
							>
								Ingresar
							</NavLink>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
