import '../../css/styles.css';
import Swal from 'sweetalert2';

export const ErrorModalPublicUser = ({ user }) => {
	const handleClose = () => {
	  Swal.fire({
		text: 'Para utilizar la aplicación, su cuenta debe tener asignado un rol, por favor contactate con un administrador.',
		icon: 'info',
		confirmButtonText: 'Cerrar',
	  }).then(() => {
		// Acciones adicionales después de cerrar el SweetAlert2 si es necesario
	  });
	};
  
	if (user === 0) {
	  handleClose();
	}
  
	return null;
  };
  