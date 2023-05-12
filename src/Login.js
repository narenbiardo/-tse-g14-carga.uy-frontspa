import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Login = () => {
	return (
		<div>
			<Form className="mb-3">
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-muted">
						No compartas tu contraseña con nadie.
					</Form.Text>
				</Form.Group>
				<Button variant="primary" type="submit">
					Ingresar
				</Button>
			</Form>
			<a href="#nada">Registrarse</a>
		</div>
	);
};

export default Login;
