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
		console.log(document.cookie);
		document.cookie = `JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		logout();
		navigate("/login");
	};

	return <Button onClick={handleClick}>Logout</Button>;
};
