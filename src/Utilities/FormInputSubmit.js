import { mainColor } from "../constants";

export const FormInputSubmit = ({ onClickHandler, value, validForm }) => {
	return (
		<input
			onClick={onClickHandler}
			type="submit"
			value={value}
			disabled={!validForm}
			style={{
				backgroundColor: validForm ? mainColor : "grey",
				color: "#fff",
				border: "none",
				padding: "10px 20px",
				borderRadius: "5px",
				fontSize: "16px",
			}}
		/>
	);
};
