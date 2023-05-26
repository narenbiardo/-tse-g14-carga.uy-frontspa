export const FormInputSubmit = ({ onClickHandler, value }) => {
	return (
		<input
			onClick={onClickHandler}
			type="submit"
			value={value}
			style={{
				backgroundColor: "#16b7b9",
				color: "#fff",
				border: "none",
				padding: "10px 20px",
				borderRadius: "5px",
				fontSize: "16px",
			}}
		/>
	);
};
