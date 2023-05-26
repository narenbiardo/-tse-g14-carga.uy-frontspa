import { FormInputDiv } from "./FormInputDiv";

export const FormInputDate = ({
	htmlFor,
	label,
	type,
	name,
	max,
	min,
	onChangeHandler,
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
