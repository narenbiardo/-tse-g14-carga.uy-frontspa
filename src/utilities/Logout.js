import { Button } from "react-bootstrap";
import {
	Route,
	Routes,
	Link,
	NavLink,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useAuth } from "../useAuth";

export const Logout = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleClick = () => {
		logout();
		navigate("/login");
	};

	return <Button onClick={handleClick}>Logout</Button>;
};
