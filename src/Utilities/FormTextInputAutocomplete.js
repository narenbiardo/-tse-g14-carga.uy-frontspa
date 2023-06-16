import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";
import TextInput from "react-autocomplete-input";

export const FormTextInputAutocomplete = ({
	htmlFor,
	label,
	name,
	form,
	onChangeHandler,
	optionArray,
	maxOptionNumber,
	isValid,
	invalidText,
}) => {
	const [firstTime, setFirstTime] = useState(true);

	const handleFirstTime = () => {
		setFirstTime(false);
	};

	return (
		<FormInputDiv>
			<div>
				<label htmlFor={htmlFor}>{label}</label>
			</div>

			<TextInput
				name={name}
				form={form}
				onChange={onChangeHandler}
				options={optionArray}
				maxOptions={maxOptionNumber}
				trigger=""
				Component="input"
				spacer=""
				onBlur={handleFirstTime}
				className={isValid || firstTime ? 'form-input' : 'form-input invalid'}

			/>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
