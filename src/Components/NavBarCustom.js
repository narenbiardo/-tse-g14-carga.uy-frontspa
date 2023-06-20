import { useState } from "react";
import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth, AuthProvider } from "../Services/useAuth";
import { Logout } from "../Utilities/Logout";
import { Login } from "../Services/LoginGubUy";
import { SvgLogo } from "../Utilities/SvgLogo";
import { mainColor } from "../constants";
import jwt_decode from "jwt-decode";
import cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { Perfil } from "./Perfil";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();
	const [dropdownHovered, setDropdownHovered] = useState(null);
	const [navLinkHovered, setNavLinkHovered] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

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
		<Navbar bg="dark" expand="lg" className="shadow-sm" variant="dark">
			<Container>
				<Navbar.Brand onClick={handleBrandClick} style={{ cursor: "pointer" }}>
					<SvgLogo color={mainColor} dataName="Layer 1" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated && user === 1 && (
							<>
								<NavDropdown title="Guia de Viaje" id="nav-dropdown">
									<NavDropdown.Item
										as={Link}
										to="/ingresarGuiaDeViaje"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(0)}
										onMouseLeave={handleNavLinkLeave}
									>
										Ingresar Guía de Viaje
									</NavDropdown.Item>

									<NavDropdown.Item
										as={Link}
										to="/asignarGuiaDeViaje"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(1)}
										onMouseLeave={handleNavLinkLeave}
									>
										Asignar Guía de Viaje
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title="Vehículo">
									<NavDropdown.Item
										as={Link}
										to="/añadirVehiculo"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(2)}
										onMouseLeave={handleNavLinkLeave}
									>
										Añadir Vehiculo
									</NavDropdown.Item>

									<NavDropdown.Item
										as={Link}
										to="/editarVehiculo"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(3)}
										onMouseLeave={handleNavLinkLeave}
									>
										Editar Vehiculo
									</NavDropdown.Item>

									<NavDropdown.Item
										as={Link}
										to="/eliminarVehiculo"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(4)}
										onMouseLeave={handleNavLinkLeave}
									>
										Eliminar Vehiculo
									</NavDropdown.Item>
								</NavDropdown>
								<Link to="/empresa" className="nav-link">
									Empresa
								</Link>
							</>
						)}
						{isAuthenticated && user === 2 && (
							<>
								<NavDropdown title="Empresa">
									<NavDropdown.Item
										as={Link}
										to="/añadirEmpresa"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(5)}
										onMouseLeave={handleNavLinkLeave}
									>
										Añadir Empresa
									</NavDropdown.Item>
									<NavDropdown.Item
										as={Link}
										to="/modificarEmpresa"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(6)}
										onMouseLeave={handleNavLinkLeave}
									>
										Modificar Empresa
									</NavDropdown.Item>
									<NavDropdown.Item
										as={Link}
										to="/eliminarEmpresa"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(7)}
										onMouseLeave={handleNavLinkLeave}
									>
										Eliminar Empresa
									</NavDropdown.Item>
								</NavDropdown>
								<Link to="/vehiculos" className="nav-link">
									Vehículos
								</Link>
							</>
						)}
					</Nav>
					<Nav className="ms-auto">
						{!isAuthenticated && <Login />}
						{isAuthenticated && (user === 1 || user === 2) && (
							<>
								<NavDropdown
									title={`Bienvenido, ${
										jwt_decode(cookies.get("code")).nombre
									}`}
									id="nav-dropdown-perfil"
									className="ml-auto"
								>
									<NavDropdown.Item
										as={Link}
										to="/perfil"
										className="nav-link item"
										onMouseEnter={() => handleNavLinkEnter(0)}
										onMouseLeave={handleNavLinkLeave}
									>
										Perfil
									</NavDropdown.Item>
									<Logout />
								</NavDropdown>
								<div className="d-none d-lg-block">
									<Avatar sx={{ bgcolor: "#FF5B31" }}>
										{jwt_decode(cookies.get("code")).nombre[0] +
											jwt_decode(cookies.get("code")).apellido[0]}
									</Avatar>
								</div>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
