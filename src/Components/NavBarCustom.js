import { useState } from "react";
import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "../Services/useAuth";
import { Logout } from "../Utilities/Logout";
import { Login } from "../Services/LoginGubUy";
import { IngresarGuiaDeViaje } from "./IngresarGuiaDeViaje";
import { SvgLogo } from "../Utilities/SvgLogo";
import { mainColor } from "../constants";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();
	const [dropdownHovered, setDropdownHovered] = useState(null);
	const [navLinkHovered, setNavLinkHovered] = useState(null);

	const navigate = useNavigate();

	const handleBrandClick = () => {
		navigate("/");
	};

	const handleNavLinkEnter = index => {
		setNavLinkHovered(index);
	};

	const handleNavLinkLeave = () => {
		setNavLinkHovered(null);
	};

	return (
		<Navbar bg="white" expand="lg" className="shadow-sm">
			<Container>
				<Navbar.Brand onClick={handleBrandClick} style={{ cursor: "pointer" }}>
					<SvgLogo color={mainColor} dataName="Layer 1" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated &&
							user === 1 && ( // EncargadoEmpresa
								<>
									<NavDropdown title="Guía de Viaje">
										<NavLink
											to="/ingresarGuiaDeViaje"
											className="nav-link"
											onMouseEnter={() => handleNavLinkEnter(0)}
											onMouseLeave={handleNavLinkLeave}
											style={{
												backgroundColor:
													navLinkHovered === 0 ? mainColor : "transparent",
												color: navLinkHovered === 0 ? "#fff" : "inherit",
											}}
										>
											Ingresar Guía de Viaje
										</NavLink>
										<NavLink
											to="/asignarGuiaDeViaje"
											className="nav-link"
											onMouseEnter={() => handleNavLinkEnter(1)}
											onMouseLeave={handleNavLinkLeave}
											style={{
												backgroundColor:
													navLinkHovered === 1 ? mainColor : "transparent",
												color: navLinkHovered === 1 ? "#fff" : "inherit",
											}}
										>
											Asignar Guía de Viaje
										</NavLink>
									</NavDropdown>
									<NavDropdown title="Vehículo">
										<NavLink
											to="/agregarVehiculo"
											className="nav-link"
											onMouseEnter={() => handleNavLinkEnter(2)}
											onMouseLeave={handleNavLinkLeave}
											style={{
												backgroundColor:
													navLinkHovered === 2 ? mainColor : "transparent",
												color: navLinkHovered === 2 ? "#fff" : "inherit",
											}}
										>
											Agregar Vehiculo
										</NavLink>
										<NavLink
											to="/editarVehiculo"
											className="nav-link"
											onMouseEnter={() => handleNavLinkEnter(3)}
											onMouseLeave={handleNavLinkLeave}
											style={{
												backgroundColor:
													navLinkHovered === 3 ? mainColor : "transparent",
												color: navLinkHovered === 3 ? "#fff" : "inherit",
											}}
										>
											Editar Vehiculo
										</NavLink>
										<NavLink
											to="/eliminarVehiculo"
											className="nav-link"
											onMouseEnter={() => handleNavLinkEnter(4)}
											onMouseLeave={handleNavLinkLeave}
											style={{
												backgroundColor:
													navLinkHovered === 4 ? mainColor : "transparent",
												color: navLinkHovered === 4 ? "#fff" : "inherit",
											}}
										>
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
								<>
									<NavLink to="/empresas" className="nav-link">
										Empresas
									</NavLink>
									<NavLink to="/vehiculos" className="nav-link">
										Vehículos
									</NavLink>
								</>
							)}
						{isAuthenticated && (user === 1 || user === 2) && (
							// EncargadoEmpresa or Funcionario
							<>
								<NavLink to="/perfil" className="nav-link">
									Perfil
								</NavLink>
							</>
						)}
					</Nav>
					<Nav className="ms-auto">
						{isAuthenticated ? ( // Not logged
							<Logout />
						) : (
							<Login />
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
