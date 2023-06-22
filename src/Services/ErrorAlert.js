import Swal from 'sweetalert2';


export default function ErrorAlert({ error }) {
		
	Swal.fire({
		text: error && error.message,
		title: 'ERROR',
		icon: 'error',
		confirmButtonText: 'Aceptar',
		});
	
}
