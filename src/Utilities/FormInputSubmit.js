import { mainColor } from "../constants";

export const FormInputSubmit = ({ onClickHandler, value, validForm }) => {
	return (
		<input
			onClick={onClickHandler}
			type="submit"
			value={value}
			className="btn-principal mt-4"
			disabled={!validForm}

		/>
	);
};
