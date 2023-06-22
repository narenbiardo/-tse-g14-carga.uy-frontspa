import { Form } from "react-bootstrap";


export const FormDiv = ({onSubmit, referencia, children}) => {
	return (
		<Form ref={referencia} onSubmit={onSubmit}>
			{children}
		</Form>
	);
};
