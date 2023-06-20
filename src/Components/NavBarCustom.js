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
import Avatar from '@mui/material/Avatar'

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
						{isAuthenticated && user === 1 &&
							( // EncargadoEmpresa
								<>
									<NavDropdown title="Guia de Viaje" id="nav-dropdown">
										<NavDropdown.Item className="nav-link item">
											<NavLink
												to="/ingresarGuiaDeViaje"
												className="nav-link item"
												onMouseEnter={() => handleNavLinkEnter(0)}
												onMouseLeave={handleNavLinkLeave}
											>
												Ingresar Guía de Viaje
											</NavLink>
										</NavDropdown.Item>

										<NavDropdown.Item className="nav-link item">
											<NavLink
												to="/asignarGuiaDeViaje"
												className="nav-link item"
												onMouseEnter={() => handleNavLinkEnter(1)}
												onMouseLeave={handleNavLinkLeave}
											>
												Asignar Guía de Viaje
											</NavLink>
										</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Vehículo">
										<NavDropdown.Item className="nav-link item">
											<NavLink
												to="/agregarVehiculo"
												className="nav-link item"
												onMouseEnter={() => handleNavLinkEnter(2)}
												onMouseLeave={handleNavLinkLeave}
											>
												Agregar Vehiculo
											</NavLink>
										</NavDropdown.Item>

										<NavDropdown.Item className="nav-link item">
											<NavLink
												to="/consultarVehiculo"
												className="nav-link item"
												onMouseEnter={() => handleNavLinkEnter(3)}
												onMouseLeave={handleNavLinkLeave}
											>
												Consultar Vehiculos
											</NavLink>
										</NavDropdown.Item>

									</NavDropdown>
									<NavLink to="/empresa" className="nav-link">
										Empresa
									</NavLink>
								</>
							)}
						{isAuthenticated && user === 2 &&
							( // Funcionario
								<>
									<NavLink to="/empresas" className="nav-link">
										Empresas
									</NavLink>
									<NavLink to="/vehiculos" className="nav-link">
										Vehículos
									</NavLink>
								</>
							)}
					</Nav>
					<Nav className="ms-auto">
						{!isAuthenticated && <Login />}
						{isAuthenticated && (user === 1 || user === 2) &&
							(
								<>
									<NavDropdown
										title={`Bienvenido, ${jwt_decode(cookies.get("code")).nombre}`}
										id="nav-dropdown-perfil"
										className="ml-auto"
									>
										<NavDropdown.Item className="nav-link item">
											<NavLink
												to="/perfil"
												className="nav-link item"
												onMouseEnter={() => handleNavLinkEnter(0)}
												onMouseLeave={handleNavLinkLeave}
											>
												Perfil
											</NavLink>
											{/* <Button variant="contained" onClick={openDialog}>Perfil</Button>
											<Dialog
												open={isOpen}
												onClose={closeDialog}
												maxWidth="md"
												fullWidth
												PaperProps={{
													style: {
													  maxHeight: '100vh', // Ajusta la altura según tus necesidades
													},
												  }}
												>
												<DialogTitle>Perfil</DialogTitle>
												<DialogContent>
													<Perfil/>
												</DialogContent>
												<DialogActions>
													<Button onClick={closeDialog} color="secondary">Cerrar</Button>
												</DialogActions>
												</Dialog> */}
										</NavDropdown.Item>

										<NavDropdown.Item className="nav-link item">
											<Logout />
										</NavDropdown.Item>
									</NavDropdown>
									<div className="d-none d-lg-block">
										<Avatar sx={{ bgcolor: "#FF5B31" }} >
											{jwt_decode(cookies.get("code")).nombre[0] + jwt_decode(cookies.get("code")).apellido[0]}
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
