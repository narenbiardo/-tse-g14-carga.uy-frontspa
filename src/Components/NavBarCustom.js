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
import { Logout } from "../utilities/Logout";
import { IngresarGuiaDeViaje } from "./IngresarGuiaDeViaje";

export const NavBarCustom = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink to="/">Home</NavLink>
						{isAuthenticated ? (
							<Logout />
						) : (
							<NavLink to="/login">Login</NavLink>
						)}
						<NavLink to="/usuarioLog">VerUsuarioSiEstaLog</NavLink>
						<Link to={"/axiosPrueba"}>Axios Prueba</Link>

						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item>
								<Link to="/">Home</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to="/login">Login</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to={"/ingresarGuiaDeViaje"}>Ingresar Guia De Viaje</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to={"/axiosPrueba"}>Axios Prueba</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
