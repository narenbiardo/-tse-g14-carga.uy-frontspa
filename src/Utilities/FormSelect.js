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
				<option value="" selected disabled>
					{optionDisabled}
				</option>
				{valueArray.map(element => (
					<option value={element.id} key={Math.random()}>
						{element.nombre}
					</option>
				))}
			</select>
		</FormInputDiv>
	);
};