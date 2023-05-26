import { FormInputDiv } from "./FormInputDiv";

export const FormInputText = ({ htmlFor, label, name, onChangeHandler }) => {
	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				type="text"
				name={name}
				onChange={onChangeHandler}
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
		</FormInputDiv>
	);
};
