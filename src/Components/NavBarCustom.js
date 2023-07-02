import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";
import { Logout } from "../Utilities/Logout";
import { Login } from "../Services/LoginGubUy";
import { SvgLogo } from "../Utilities/SvgLogo";
import { mainColor } from "../constants";
import jwt_decode from "jwt-decode";
import cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();
	const { user } = useAuth();
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

	const handleCollapse = () => {
		console.log("handleCollapse");
		var nav = document.getElementById("basic-navbar-nav");
		var btn = document.getElementById("navbarBtn");
		nav.classList.remove("show");
		btn.classList.add("collapsed");
	  };


	return (
		<Navbar
			bg="dark"
			expand="lg"
			className="shadow-sm fixed-top"
			variant="dark"
		>
			<Container className="mt-2 mb-1">
				<Navbar.Brand
					onClick={handleBrandClick}
					style={{ cursor: "pointer" }}
					className="mb-2"
				>
					<SvgLogo color={mainColor} dataName="Layer 1" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" id="navbarBtn"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated &&
							user === 1 && ( // EncargadoEmpresa
								<>
									<NavDropdown title="Guia de Viaje" id="nav-dropdown">
										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/ingresarGuiaDeViaje"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(0)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Ingresar Guía de Viaje
											</NavLink>
										</NavDropdown.Item>

										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/asignarGuiaDeViaje"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(1)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Asignar Guía de Viaje
											</NavLink>
										</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Vehículo">
										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/agregarVehiculo"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(2)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Agregar Vehiculo
											</NavLink>
										</NavDropdown.Item>

										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/consultarVehiculos"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(3)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Consultar Vehiculo
											</NavLink>
										</NavDropdown.Item>
									</NavDropdown>
									<NavLink 
										to="/empresa" 
										className="nav-link" 
										onClick={handleCollapse}
									>
										Empresa
									</NavLink>
								</>
							)}
						{isAuthenticated &&
							user === 2 && ( // Funcionario
								<>
									<NavDropdown title="Empresa">
										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/añadirEmpresa"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(5)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Añadir Empresa
											</NavLink>
										</NavDropdown.Item>
										<NavDropdown.Item className="nav-link item ps-2 px-md-2">
											<NavLink
												to="/ConsultarEmpresa"
												className="nav-link ps-2 px-md-2"
												onMouseEnter={() => handleNavLinkEnter(6)}
												onMouseLeave={handleNavLinkLeave}
												onClick={handleCollapse}
											>
												Consultar Empresa
											</NavLink>
										</NavDropdown.Item>
									</NavDropdown>
									<NavLink to="/vehiculos" className="nav-link">
										Vehículos
									</NavLink>
								</>
							)}
					</Nav>
					<Nav className="ms-auto">					
						{/* {!isAuthenticated && <Login />} */}
						{isAuthenticated && (user === 1 || user === 2) ? (
							<>
								<NavDropdown
									title={`Bienvenido, ${
										jwt_decode(cookies.get("code")).nombre
									}`}
									id="nav-dropdown-perfil"
									className="ml-auto"
								>
									<NavDropdown.Item className="nav-link item ps-2 px-md-2">
										<NavLink
											to="/perfil"
											className="nav-link ps-2 px-md-2"
											onMouseEnter={() => handleNavLinkEnter(0)}
											onMouseLeave={handleNavLinkLeave}
											onClick={handleCollapse}
										>
											Perfil
										</NavLink>
									</NavDropdown.Item>

									<NavDropdown.Item className="nav-link item ps-2 px-md-2">
										<Logout />
									</NavDropdown.Item>
								</NavDropdown>
								<div className="d-none d-lg-block">
									<Avatar sx={{ bgcolor: user === 1 ? "#bf5700" : "#caa57a" }}>
										{jwt_decode(cookies.get("code")).nombre[0] +
											jwt_decode(cookies.get("code")).apellido[0]}
									</Avatar>
								</div>
							</>
							) : (
								<Login />
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
