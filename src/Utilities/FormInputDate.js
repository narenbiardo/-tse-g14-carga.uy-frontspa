import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

const currentDateTime = new Date();
currentDateTime.setHours(currentDateTime.getHours() - 3);
const minDateTime = currentDateTime.toISOString().slice(0, 16);


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
			<div>
				<label htmlFor={htmlFor}>{label}</label>
			</div>
			<input
				type={type}
				name={name}
				max={max}
				min={minDateTime} // Le sumo 3 para pasarlo al horario local ya que sino me devuelve +3 horas de la hora actual
				required
				onChange={onChangeHandler}
				onBlur={handleFirstTime}
				value={inputValue}
				className={isValid || firstTime ? 'form-input' : 'form-input invalid'}

			/>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
