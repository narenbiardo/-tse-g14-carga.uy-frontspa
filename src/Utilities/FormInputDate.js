import { FormInputDiv } from "./FormInputDiv";
import TextField from '@mui/material/TextField';


const currentDateTime = new Date();
currentDateTime.setHours(currentDateTime.getHours() - 3);
const minDateTime = currentDateTime.toISOString().slice(0, 16);


export const FormInputDate = ({
	htmlFor,
	label,
	type,
	name,
	max,
	min,
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
				InputLabelProps={{ shrink: true }}
				name={name}
				label={label}
				variant="outlined" 
				fullWidth 
				value={inputValue}
				type={type}
				onChange={onChangeHandler}
				required
				margin="dense"
				size="small"
				onBlur={handleFirstTime}
				error={!isValid && !firstTime}
				helperText={!isValid && !firstTime ? invalidText : ""}		
				max={max}
				min={minDateTime}
				color="success"
				
			/>

		</FormInputDiv>
	);
};
