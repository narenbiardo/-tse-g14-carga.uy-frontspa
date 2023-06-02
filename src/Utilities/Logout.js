import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";

export const Logout = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleClick = () => {
		logout();
		navigate("/");
	};

	return <Button onClick={handleClick}>Cerrar sesión</Button>;
};
