import { FormInputDiv } from "./FormInputDiv";
import TextField from '@mui/material/TextField';

export const FormInputText = ({
	htmlFor,
	label,
	name,
	onChangeHandler,
	inputValue,
	isValid,
	invalidText,
	firstTime,
	handleFirstTime,
	required
}) => {
	return (
		<FormInputDiv>
			<TextField
				name={name}
				label={label}
				variant="outlined" 
				fullWidth 
				value={inputValue}
				type="text"
				onChange={onChangeHandler}
				required={required}
				onBlur={handleFirstTime}
				margin="dense"
				size="small"
				error={!isValid && !firstTime}
				helperText={!isValid && !firstTime ? invalidText : ""}
				color="success"
			/>
		</FormInputDiv>
	);
};
