import { FormInputDiv } from "./FormInputDiv";
import TextField from '@mui/material/TextField';

export const FormInputNumber = ({
	htmlFor,
	label,
	name,
	step,
	onChangeHandler,
	inputValue,
	isValid,
	invalidText,
	firstTime,
	handleFirstTime,
}) => {
	return (
		<FormInputDiv>
			<TextField
				name={name}
				label={label}
				variant="outlined" 
				fullWidth 
				value={inputValue}
				type="number"
				onChange={onChangeHandler}
				required
				margin="dense"
				size="small"
				onBlur={handleFirstTime}
				error={!isValid && !firstTime}
				helperText={!isValid && !firstTime ? invalidText : ""}		
				step={step}
				min={0}
				color="success"
				
			/>
		</FormInputDiv>
	);
};
