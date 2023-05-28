import { ListGroup, ListGroupItem } from "react-bootstrap";

export const ListVehiculo = () => {
	return (
		<>
			{valueArray.map(element => (
				<option value={element.id} key={Math.random()}>
					{element.nombre}
				</option>
			))}
		</>
	);
};
