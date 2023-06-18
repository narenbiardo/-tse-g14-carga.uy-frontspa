import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormInputText = ({
	htmlFor,
	label,
	name,
	onChangeHandler,
	inputValue,
	isValid,
	invalidText,
	firstTime,
	handleFirstTime,
}) => {
	return (
		<FormInputDiv>
			<div>
				<label htmlFor={htmlFor}>{label}</label>
			</div>
			<input
				type="text"
				name={name}
				onChange={onChangeHandler}
				value={inputValue}
				required
				onBlur={handleFirstTime}
				className={isValid || firstTime ? "form-input" : "form-input invalid"}
			/>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
