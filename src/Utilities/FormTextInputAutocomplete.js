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
}) => {
	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			{
				<TextInput
					name={name}
					form={form}
					onChange={onChangeHandler}
					options={optionArray}
					maxOptions={maxOptionNumber}
					trigger=""
					Component="input"
					spacer=""
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid #16b7b9",
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			}
		</FormInputDiv>
	);
};
