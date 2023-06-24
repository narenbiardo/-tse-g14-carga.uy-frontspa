import { Form } from "react-bootstrap";


export const FormDiv = ({onSubmit, referencia, id, children}) => {
	return (
		<Form ref={referencia} onSubmit={onSubmit} id={id}>
			{children}
		</Form>
	);
};
