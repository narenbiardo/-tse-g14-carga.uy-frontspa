import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormInputText = ({
	htmlFor,
	label,
	name,
	onChangeHandler,
	isValid,
	invalidText,
}) => {
	const [firstTime, setFirstTime] = useState(true);

	const handleFirstTime = () => {
		setFirstTime(false);
	};

	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				type="text"
				name={name}
				onChange={onChangeHandler}
				onBlur={handleFirstTime}
				style={{
					marginLeft: "10px",
					padding: "5px",
					border: "none",
					borderBottom:
						isValid || firstTime ? "2px solid " + mainColor : "2px solid red",
					width: "250px",
					fontSize: "16px",
					color: "#555",
				}}
			/>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
