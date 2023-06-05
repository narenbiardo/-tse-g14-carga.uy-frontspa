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
			<label htmlFor={htmlFor}>{label}</label>

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
