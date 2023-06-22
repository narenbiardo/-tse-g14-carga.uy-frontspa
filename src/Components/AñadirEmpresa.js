import { useState, useEffect } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { AñadirEmpresaForm, DireccionEmpresa } from "../classes";
import { ftiaef } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { Button, Container } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";
import { animateScroll as scroll } from "react-scroll";
import { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

export const AñadirEmpresa = () => {
	const [aef, setaef] = useState(new AñadirEmpresaForm());
	const [de, setDe] = useState(new DireccionEmpresa());
	const [firstTimeInput, setfirstTimeInput] = useState(ftiaef);
	const [loading, setLoading] = useState(false);
	const formRefAñadirEmpresa = useRef(null);

	const handleChangeAef = e => {
		const { name, value } = e.target;
		setaef(prevData => ({ ...prevData, [name]: value }));
	};

	const handleChangeDe = e => {
		const { name, value } = e.target;
		setDe(prevData => ({ ...prevData, [name]: value }));
	};

	const handleFirstTimeInput = e => {
		if (e.target) {
			const { name } = e.target;
			setfirstTimeInput(prevData => ({ ...prevData, [name]: false }));
		} else {
			//e.target will be null in TextInput component
			setfirstTimeInput(prevData => ({
				...prevData,
				["marcaVehiculo"]: false,
			}));
		}
	};

	const handlePostEmpresa = event => {
		event.preventDefault();
		setLoading(true);
		axios
			.post(RESTEndpoints.funcionarioService.addEmpresa, {
				nroEmpresa: aef.nroEmpresa,
				razonSocial: aef.razonSocial,
				nombreEmpresa: aef.nombreEmpresa,
				direccionEmpresa: aef.direccionEmpresa,
			})
			.then(response => {
				setLoading(false);
				Swal.fire({
					title: "Confirmado",
					timer: 2500,
					text: "La empresa fue añadida con éxito!",
					icon: "success",
					confirmButtonText: "Aceptar",
				}).then(() => {
					formRefAñadirEmpresa.current.reset();
					//selectRef.current.selectedIndex = "";
					scroll.scrollToTop({
						duration: 200,
						smooth: "easeInOutQuart",
					});
				});
			})
			.catch(error => {
				setLoading(false);
				let errorMessage =
					"ERROR: Ha ocurrido un error al añadir la empresa, vuelva a intentarlo";

				if (error.response && error.response.data) {
					errorMessage = `${error.response.data}`;
				}

				Swal.fire({
					text: errorMessage,
					title: "Error",
					icon: "error",
					confirmButtonText: "Aceptar",
				});
			});
	};

	useEffect(() => {
		setaef(prevData => ({ ...prevData, ["direccionEmpresa"]: de }));
	}, [de]);

	return (
		<Container className="py-4 bg-white rounded-4 border border-secondary-subtle">
			<FormDiv referencia={formRefAñadirEmpresa} onSubmit={handlePostEmpresa}>
				<FormH2 text="Añadir Empresa" />

				<FormInputText
					htmlFor="nroEmpresa"
					label="Número"
					name="nroEmpresa"
					onChangeHandler={handleChangeAef}
					isValid={aef.nroEmpresa?.length > 0}
					invalidText={"El número no puede ser vacío"}
					firstTime={firstTimeInput.nroEmpresa}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="razonSocial"
					label="Razón Social"
					name="razonSocial"
					onChangeHandler={handleChangeAef}
					isValid={aef.razonSocial?.length > 0}
					invalidText={"La razón social no puede ser vacía"}
					firstTime={firstTimeInput.razonSocial}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="nombreEmpresa"
					label="Nombre"
					name="nombreEmpresa"
					onChangeHandler={handleChangeAef}
					isValid={aef.nombreEmpresa?.length > 0}
					invalidText={"El nombre no puede estar vacío"}
					firstTime={firstTimeInput.nombreEmpresa}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="calle"
					label="Calle"
					name="calle"
					onChangeHandler={handleChangeDe}
					isValid={de.calle?.length > 0}
					invalidText={"La calle no puede ser vacía"}
					firstTime={firstTimeInput.calle}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="nroPuerta"
					label="Número de puerta"
					name="nroPuerta"
					onChangeHandler={handleChangeDe}
					isValid={de.nroPuerta?.length > 0}
					invalidText={"El número de peurta no puede estar vacío"}
					firstTime={firstTimeInput.nroPuerta}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="km"
					label="Km"
					name="km"
					onChangeHandler={handleChangeDe}
					isValid={de.km?.length > 0}
					invalidText={"El Km no ser vacío"}
					firstTime={firstTimeInput.km}
					handleFirstTime={handleFirstTimeInput}
				/>

				<Button
					type="submit"
					className={
						loading
							? "btn-principal submit mt-2 mb-2 btn-disabled"
							: "btn-principal submit mt-2 mb-2"
					}
					disabled={loading ? true : false}
				>
					{loading ? (
						<AiOutlineLoading3Quarters className="loading-icon" />
					) : (
						"Enviar"
					)}
				</Button>
			</FormDiv>
		</Container>
	);
};
