import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormInputDate = ({
	htmlFor,
	label,
	type,
	name,
	max,
	min,
	onChangeHandler,
	inputValue,
	isValid,
	invalidText,
	firstTime,
	handleFirstTime,
}) => {
	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				type={type}
				name={name}
				max={max}
				min={min}
				onChange={onChangeHandler}
				onBlur={handleFirstTime}
				value={inputValue}
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
