import { FormInputDiv } from "./FormInputDiv";

export const FormInputNumber = ({
	htmlFor,
	label,
	name,
	step,
	onChangeHandler,
}) => {
	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				type="number"
				name={name}
				step={step}
				min={0}
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