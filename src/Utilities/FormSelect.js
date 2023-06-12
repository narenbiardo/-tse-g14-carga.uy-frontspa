import { FormInputDiv } from "./FormInputDiv";

export const FormSelect = ({
	htmlFor,
	label,
	name,
	form,
	onChangeHandler,
	optionDisabled,
	valueArray,
}) => {
	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<select
				name={name}
				form={form}
				onChange={onChangeHandler}
				defaultValue=""
				required
				style={{
					marginLeft: "10px",
					padding: "5px",
					border: "none",
					borderBottom: "2px solid #16b7b9",
					width: "250px",
					fontSize: "16px",
					color: "#555",
				}}
			>
				<option value="" disabled>
					{optionDisabled}
				</option>
				{valueArray.map(element => (
					<option value={element.nombre} key={Math.random()}>
						{element.nombre}
					</option>
				))}
			</select>
		</FormInputDiv>
	);
};
