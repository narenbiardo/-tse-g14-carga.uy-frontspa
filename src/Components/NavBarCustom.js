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
						{isAuthenticated &&
							user === 1 && ( // Encargado
								<>
									<NavDropdown title="Guía de Viaje">
										<NavLink to="/ingresarGuiaDeViaje" className="nav-link">
											Ingresar Guía de Viaje
										</NavLink>
										<NavLink to="/asignarGuiaDeViaje" className="nav-link">
											Asignar Guía de Viaje
										</NavLink>
									</NavDropdown>
									<NavDropdown title="Vehículo">
										<NavLink to="/agregarVehiculo" className="nav-link">
											Agregar Vehiculo
										</NavLink>
										<NavLink to="/editarVehiculo" className="nav-link">
											Editar Vehiculo
										</NavLink>
										<NavLink to="/eliminarVehiculo" className="nav-link">
											Eliminar Vehiculo
										</NavLink>
									</NavDropdown>
									<NavLink to="/empresa" className="nav-link">
										Empresa
									</NavLink>
								</>
							)}
						{isAuthenticated &&
							user === 2 && ( // Funcionario
								<></>
							)}
						{isAuthenticated && ( // Any user
							<>
								<NavLink to="/perfil" className="nav-link">
									Perfil
								</NavLink>
							</>
						)}
					</Nav>
					<Nav className="ms-auto">
						{isAuthenticated ? ( // Not loged
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
