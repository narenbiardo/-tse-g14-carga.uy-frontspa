import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormSelectArray = ({
	htmlFor,
	label,
	name,
	form,
	onChangeHandler,
	optionDisabled,
	valueArray,
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
			<select
				name={name}
				form={form}
				onChange={onChangeHandler}
				onBlur={handleFirstTime}
				defaultValue=""
				required
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
			>
				<option value="" disabled>
					{optionDisabled}
				</option>
				{valueArray.map((element, index) => (
					<option value={index} key={Math.random()}>
						{element}
					</option>
				))}
			</select>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
