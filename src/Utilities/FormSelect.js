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
			<div>
				<label htmlFor={htmlFor}>{label}</label>
			</div>
			<select
				name={name}
				form={form}
				onChange={onChangeHandler}
				defaultValue=""
				required
				className="form-input"
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
