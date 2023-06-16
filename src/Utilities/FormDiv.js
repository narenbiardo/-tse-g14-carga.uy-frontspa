export const FormDiv = ({onSubmit, referencia, children }) => {
	return (
		<form ref={referencia} onSubmit={onSubmit} className="form-container shadow-dreamy">
			{children}
		</form>
	);
};
