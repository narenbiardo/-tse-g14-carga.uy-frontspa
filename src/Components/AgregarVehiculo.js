import { useState, useEffect } from "react";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import {
	DtPermisoNacionalCirculacion,
	AgregarVehiculoForm,
} from "../classes";
import { fti } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { Button, Container } from "react-bootstrap";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { animateScroll as scroll } from "react-scroll";
import { useRef } from "react";




export const AgregarVehiculo = () => {
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [loading, setLoading] = useState(false);
	const formRefAgregarVehiculo = useRef(null);
	const selectRef = useRef(null)


	const handleChangeAvf = e => {
		if (e.target) {
			const { name, value } = e.target;
			setAvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAvf(prevData => ({ ...prevData, ["marcaVehiculo"]: e }));
		}
	};

	const handleChangeDtpnc = e => {
		const { name, value } = e.target;
		setDtpnc(prevData => ({ ...prevData, [name]: value }));
	};

	const handleMarcasVehiculo = () => {
		axios
			.get(RESTEndpoints.vehiculosService.listaMarcasVehiculos)
			.then(response => {
				//console.log(response.data);
				var marcas = [];
				response.data.map(element => marcas.push(element.nombre));
				setMarcasVehiculos(marcas);
			})
			.catch(error => {
				console.log(error);
			});
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

	const handlePostVehiculo = (event) => {
		event.preventDefault();
		setLoading(true);
		axios
			.post(RESTEndpoints.vehiculosService.agregarVehiculo, {
				capacidad: parseFloat(avf.capacidad),
				marcaVehiculo: { nombre: avf.marcaVehiculo },
				matricula: avf.matricula,
				modelo: avf.modelo,
				nroEmpresa: jwt_decode(cookies.get("code")).nroEmpresa,
				permisoCirculacion: {
					fechaEmision: avf.permisoCirculacion.fechaEmision,
					fechaVencimiento: avf.permisoCirculacion.fechaVencimiento,
					numero: avf.permisoCirculacion.numero,
				},
				peso: parseFloat(avf.peso),
				vencimientoITV: avf.vencimientoITV,
			})
			.then(response => {
				setLoading(false)
				Swal.fire({
					title: 'Confirmado',
					timer: 2500,  
					text: 'El vehiculo fue ingresado con éxito!',
					icon: 'success',
					confirmButtonText: 'Aceptar',
				  }).then(() => {
					formRefAgregarVehiculo.current.reset();
					//selectRef.current.selectedIndex = "";
					scroll.scrollToTop({
					  duration: 200,
					  smooth: 'easeInOutQuart',
					});
				});

			})
			.catch(error => {
				setLoading(false)
				let errorMessage = "ERROR: Ha ocurrido un error al ingresar el vehiculo, vuelva a intentarlo";

				if (error.response && error.response.data) {
				  errorMessage = `${error.response.data}`
				}
			
				Swal.fire({
					text: errorMessage,
					title: 'Error',
					icon: 'error',
					confirmButtonText: 'Aceptar',
				});
			});
	};

	useEffect(() => {
		setAvf(prevData => ({ ...prevData, ["permisoCirculacion"]: dtpnc }));
	}, [dtpnc]);

	useEffect(() => {
		handleMarcasVehiculo();
	}, []);

	return (
		<Container className="form-container shadow-dreamy">
		<FormDiv referencia={formRefAgregarVehiculo} onSubmit={handlePostVehiculo}>
			<FormH2 text="Agregar Vehículo" />

			<FormInputText
				htmlFor="matricula"
				label="Matricula"
				name="matricula"
				onChangeHandler={handleChangeAvf}
				isValid={avf.matricula?.length > 0}
				invalidText={"La matricula no puede estar vacia"}
				firstTime={firstTimeInput.matricula}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputDiv>
				<div>
					<label htmlFor="marcaVehiculo">Marca</label>
				</div>
				<select
					ref={selectRef}
					name="marcaVehiculo"
					form="marcaVehiculoForm"
					onChange={handleChangeAvf}
					value={avf.marcaVehiculo}
					defaultValue=""
					required
					className="form-input"
				>
					<option value="" disabled>
						Seleccionar Marca
					</option>
					{marcasVehiculos.map((element, index) => (
						<option value={element} key={Math.random()}>
							{element}
						</option>
					))}
				</select>
			</FormInputDiv>

			<FormInputText
				htmlFor="modelo"
				label="Modelo"
				name="modelo"
				onChangeHandler={handleChangeAvf}
				isValid={avf.modelo?.length > 0}
				invalidText={"El modelo no puede estar vacío"}
				firstTime={firstTimeInput.modelo}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputNumber
				htmlFor="peso"
				label="Peso"
				name="peso"
				step="0.01"
				onChangeHandler={handleChangeAvf}
				isValid={avf.peso?.length > 0}
				invalidText={"El peso no puede estar vacío"}
				firstTime={firstTimeInput.peso}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputNumber
				htmlFor="capacidad"
				label="Capacidad"
				name="capacidad"
				step="0.01"
				onChangeHandler={handleChangeAvf}
				isValid={avf.capacidad?.length > 0}
				invalidText={"La capacidad no puede estar vacía"}
				firstTime={firstTimeInput.capacidad}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputDate
				htmlFor="vencimientoITV"
				label="Fecha de Vencimiento ITV"
				type="date"
				name="vencimientoITV"
				min={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeAvf}
				isValid={avf.vencimientoITV?.length > 0}
				invalidText={
					"La fecha de vencimiento de la ITV no puede ser vacía"
				}
				firstTime={firstTimeInput.vencimientoITV}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormH4 text="Permiso Nacional de Circulación" />

			<FormInputNumber
				htmlFor="numero"
				label="Número de Permiso"
				name="numero"
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.numero?.length > 0}
				invalidText={
					"El número del permiso no puede estar vacío"
				}
				firstTime={firstTimeInput.numero}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputDate
				htmlFor="fechaEmision"
				label="Fecha de Emision"
				type="date"
				name="fechaEmision"
				max={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.fechaEmision?.length > 0}
				invalidText={
					"La fecha de emisión del permiso no puede ser vacía"
				}
				firstTime={firstTimeInput.fechaEmision}
				handleFirstTime={handleFirstTimeInput}
			/>

			<FormInputDate
				htmlFor="fechaVencimiento"
				label="Fecha de Vencimiento"
				type="date"
				name="fechaVencimiento"
				min={new Date().toISOString().split("T")[0]}
				onChangeHandler={handleChangeDtpnc}
				isValid={dtpnc.fechaVencimiento?.length > 0}
				invalidText={
					"La fecha de vencimiento del permiso no puede ser vacía"
				}
				firstTime={firstTimeInput.fechaVencimiento}
				handleFirstTime={handleFirstTimeInput}
			/>

			<Button
				type="submit"
				className={loading ? 'btn-principal submit mt-2 mb-2 btn-disabled' : 'btn-principal submit mt-2 mb-2'}
				disabled={loading ? true : false}
			>
				{loading ? <AiOutlineLoading3Quarters className="loading-icon" /> : 'Enviar'}
			</Button>

		</FormDiv>
		</Container>

	);
};
