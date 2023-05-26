export const FormDiv = ({ children }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
				backgroundColor: "#fff",
				borderRadius: "5px",
				boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			}}
		>
			{children}
		</div>
	);
};
