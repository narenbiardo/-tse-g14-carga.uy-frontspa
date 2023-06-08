import { useState, useEffect } from "react";
import { ListaVehiculos } from "./ListaVehiculos";
import { Button } from "react-bootstrap";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "react-autocomplete-input/dist/bundle.css";
import {
	DtPermisoNacionalCirculacion,
	AgregarVehiculoForm,
	FirstTimeInput,
} from "../classes";
import { fti } from "../constants";
import { mainColor } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { FormSelectArray } from "../Utilities/FormSelectArray";
import { FormInputDiv } from "../Utilities/FormInputDiv";

export const EliminarVehiculo = () => {
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);

	const handleMatriculaVehiculo = v => {
		setMatriculaVehiculo(v.matricula);
		handleDeleteVehiculo(v.matricula);
		console.log(v.matricula);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/vehiculosService/listarVehiculos")
			.then(response => {
				//console.log(response.data);
				setvehiculos(
					response.data.map(vehiculo => {
						const permisoCirculacion = new DtPermisoNacionalCirculacion(
							vehiculo.permisoCirculacion.numero,
							vehiculo.permisoCirculacion.fechaEmision,
							vehiculo.permisoCirculacion.fechaVencimiento
						);

						return new AgregarVehiculoForm(
							vehiculo.matricula,
							vehiculo.marcaVehiculo,
							vehiculo.modelo,
							vehiculo.capacidad.toString(),
							vehiculo.peso.toString(),
							permisoCirculacion,
							vehiculo.vencimientoITV
						);
					})
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const handleDeleteVehiculo = matricula => {
		axios
			.post("http://localhost:8080/api/vehiculosService/modVehiculo", {
				matricula,
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<FormDiv>
			<FormH2 text="Eliminar Vehículo" />

			<ListaVehiculos
				onMatriculaVehiculoChange={handleMatriculaVehiculo}
				vehiculosArray={vehiculos}
			/>
		</FormDiv>
	);
};
