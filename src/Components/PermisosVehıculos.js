import { useState, useEffect } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { DtPermisoNacionalCirculacion, AgregarVehiculoForm } from "../classes";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { ListaVehiculos } from "./ListaVehiculos";

export const PermisosVehiculos = () => {
	const [vehiculo, setVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState("fti");

	const handleVehiculo = v => {
		setVehiculo(v);
		//setAvf(v);
		//setDtpnc(v.permisoCirculacion);
		console.log(v);
	};

	useEffect(() => {
		axios
			.get(RESTEndpoints.vehiculosService.listarVehiculos)
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

	return (
		<FormDiv>
			<FormH2 text={"Fiscalización de Permisos y Estado de Vehículos"} />
			<ListaVehiculos
				onVChange={handleVehiculo}
				vehiculosArray={vehiculos}
				showNroEmpresa={true}
			/>
		</FormDiv>
	);
};
