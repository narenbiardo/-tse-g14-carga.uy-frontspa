import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { DtPermisoNacionalCirculacion, VehiculoDto } from "../classes";
import { ListaVehiculos } from "./ListaVehiculos";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH4 } from "../Utilities/FromH4";

export const Home = () => {
	const [vehiculos, setvehiculos] = useState([]);

	useEffect(() => {
		axios
			.get(RESTEndpoints.vehiculosService.listarVehiculos)
			.then(response => {
				setvehiculos(
					response.data.map(vehiculo => {
						const permisoCirculacion = new DtPermisoNacionalCirculacion(
							vehiculo.permisoCirculacion.numero,
							vehiculo.permisoCirculacion.fechaEmision,
							vehiculo.permisoCirculacion.fechaVencimiento
						);

						return new VehiculoDto(
							vehiculo.matricula,
							vehiculo.nroEmpresa,
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

	return (
		<FormDiv>
			<FormH4 text={"Vehiculos del Sistema"} />
			<ListaVehiculos
				onMatriculaVehiculoChange={() => console.log()}
				vehiculosArray={vehiculos}
				showNroEmpresa={true}
			/>
		</FormDiv>
	);
};
