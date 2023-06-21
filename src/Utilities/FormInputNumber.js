import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormInputNumber = ({
	htmlFor,
	label,
	name,
	step,
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
				<label htmlFor={htmlFor} className="main-font">{label}</label>
			</div>
			<input
				type="number"
				name={name}
				step={step}
				required
				min={0}
				onChange={onChangeHandler}
				value={inputValue}
				onBlur={handleFirstTime}
				className={isValid || firstTime ? 'form-input' : 'form-input invalid'}
			/>
			{/* {console.log("FirstTime:" + firstTime + "  IsValida: " + isValid)} */}
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
