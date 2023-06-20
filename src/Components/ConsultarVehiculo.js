import { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import {
	DtPermisoNacionalCirculacion,
	AgregarVehiculoForm,
} from "../classes";
import { fti, columnsVehiculosFull } from "../constants";
import { FormDiv } from "../Utilities/FormDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDate } from "../Utilities/FormInputDate";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import Container from '@mui/material/Container';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';



export const ConsultarVehiculo = () => {	

	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemData, setSelectedItemData] = useState(null);
	const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
	const [vehiculos, setvehiculos] = useState([]);
	const [avf, setAvf] = useState(new AgregarVehiculoForm());
	const [dtpnc, setDtpnc] = useState(new DtPermisoNacionalCirculacion());
	const [marcasVehiculos, setMarcasVehiculos] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");

	const handleEditClick = (event, params) => {
		event.stopPropagation();
		setMatriculaVehiculo(params.matricula);
		setAvf(params);
		setDtpnc(params.permisoCirculacion);

		setSelectedItem(params);
		setSelectedItemData(params);
		setIsOpen(true);
	};

	const handleDeleteClick = (event, params) => {
		setMatriculaVehiculo(params.matricula);
		Swal.fire({
			title: '¿Estas seguro?',
			text: `El vehiculo de matricula ${params.matricula} sera eliminado definitivamente`,
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrar',
			cancelButtonText: 'Caneclar'
		  })
		  .then((result) => {
			if (result.isConfirmed) {
				handleDeleteVehiculo(params.matricula);
			}

		  })
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleDeleteVehiculo = matricula => {
		setLoading(true)
		axios
			.delete(RESTEndpoints.encargadoService.eliminarVehiculo + matricula)
			.then(response => {
				Swal.fire({
					title: 'Borrado!',
					text: 'El vehiculo fue borrado',
					icon: 'success',
					willClose: () => {
					  setLoading(false);
					},
				  });
			
			})
			.catch(error => {
				console.log(error);
			});
	};
	

	useEffect(() => {
		axios
			.get(RESTEndpoints.encargadoService.listarVehiculos)
			.then(response => {
				console.log("Entre al effect");
				setvehiculos(
					response.data.map(vehiculo => {
						const permisoCirculacion = new DtPermisoNacionalCirculacion(
							vehiculo.permisoCirculacion.numero,
							vehiculo.permisoCirculacion.fechaEmision,
							vehiculo.permisoCirculacion.fechaVencimiento
						);

						return new AgregarVehiculoForm(
							vehiculo.matricula,
							vehiculo.marcaVehiculo.nombre,
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
				if(error.response.data === 'No existen vehiculos registrados en el sistema')
					setvehiculos([])
				console.log(error);
			});
	}, [loading]);

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
			.get(RESTEndpoints.publicService.listaMarcasVehiculos)
			.then(response => {
				console.log(response.data);
				var marcas = [];
				response.data.map(element => marcas.push(element.nombre));
				setMarcasVehiculos(marcas);
				console.log(marcas);
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

	const handlePostVehiculo = async (event) => {
		event.preventDefault();
		setLoading(true);
	  
		try {
		  const response = await axios.put(RESTEndpoints.encargadoService.modVehiculo, {
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
		  });
	  
		  setLoading(false);
		  handleCloseDialog()
		  Swal.fire({
			title: 'Confirmado',
			timer: 2500,  
			text: 'El vehiculo fue modificado con éxito!',
			icon: 'success',
			confirmButtonText: 'Aceptar',
		  })
		} 
		catch (error) {
			setLoading(false);
			handleCloseDialog()
			let errorMessage = 'Ha ocurrido un error, vuelva a intentarlo';
	  
		  if (error.response && error.response.data) {
			errorMessage = `${error.response.data}`;
		  }
	  
		  Swal.fire({
 			text: errorMessage,
			title: 'Error',
			icon: 'error',
			confirmButtonText: 'Aceptar',
		  });
		}
	  };

	const getRowIdVehiculos = row => {
		return Math.random().toString();
	};

	const handleQuickFilterMatriculaValue = useCallback(
		value => {
			setQuickFilterMatriculaValue(value);
		},
		[quickFilterMatriculaValue]
	);

	useEffect(() => {
		setAvf(prevData => ({ ...prevData, ["permisoCirculacion"]: dtpnc }));
	}, [dtpnc]);

	useEffect(() => {
		handleMarcasVehiculo();
	}, []);

	const getRowClassName = (params) => {
		return params.indexRelativeToCurrentPage % 2 === 0 ? 'striped-row-even' : 'striped-row-odd';
	  };

	return (
		<Container className="form-container shadow-dreamy">
			<DataGrid
			getRowClassName={getRowClassName}
			rows={vehiculos}
			columns={columnsVehiculosFull}
			checkboxSelection={false}
			hideFooterSelectedRowCount={true}
			onRowClick={(params, event) => {
				if (event.target.classList.contains('edit-icon')) {
				  handleEditClick(event, params.row);
				}
				else if (event.target.classList.contains('delete-icon')) {
					handleDeleteClick(event, params.row);
				  }
			  }}
			getRowId={getRowIdVehiculos}
			initialState={{
			pagination: { paginationModel: { pageSize: 10 } },
			}}
			slots={{
				toolbar: CustomToolbar,
				}}
			slotProps={{
			toolbar: {
				setQuickFilter: handleQuickFilterMatriculaValue,
				placeholder: 'Buscar por matricula',
			},
			}}
			filterModel={{
			items: [
				{
				id: 1,
				field: 'matricula',
				operator: 'contains',
				value: quickFilterMatriculaValue,
				},
			],
			}}
			autoHeight
		/>
			
		{selectedItem && (
        <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth >
          <DialogContent className="dialog">
			<FormDiv onSubmit={handlePostVehiculo}>
				<FormH2 text="Editar Vehículo" />
					<>
						<FormInputDiv>
							<div>
								<label htmlFor="matricula">Matricula</label>
							</div>
							<input
								type="text"
								name="matricula"
								onChangeHandler={handleChangeAvf}
								value={matriculaVehiculo}
								disabled
								className="form-input"
							/>
						</FormInputDiv>

						<FormInputDiv>
							<div>
								<label htmlFor="marcaVehiculo">Marca</label>
							</div>
							<select
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
							inputValue= {avf.modelo}//{selectedItemData?.modelo || ""}
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
							inputValue={avf.peso}//{selectedItemData?.peso || ""}
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
							inputValue={avf.capacidad}//{selectedItemData?.capacidad || ""}
							isValid={avf.capacidad?.length > 0}
							invalidText={"La capacidad no puede estar vacía"}
							firstTime={firstTimeInput.capacidad}
							handleFirstTime={handleFirstTimeInput}
						/>

						<FormInputDate
							htmlFor="vencimientoITV"
							label="Fecha vencimiento ITV"
							type="date"
							name="vencimientoITV"
							min={new Date().toISOString().split("T")[0]}
							onChangeHandler={handleChangeAvf}
							inputValue={avf.vencimientoITV}//{selectedItemData?.vencimientoITV || ""}
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
							label="Número"
							name="numero"
							onChangeHandler={handleChangeDtpnc}
							inputValue={avf.permisoCirculacion.numero}//{selectedItemData?.permisoCirculacion.numero || ""}
							isValid={dtpnc.numero?.length > 0}
							invalidText={
								"El número de permiso no puede estar vacío"
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
							inputValue={avf.permisoCirculacion.fechaEmision}//{selectedItemData?.permisoCirculacion.fechaEmision || ""}
							isValid={dtpnc.fechaEmision?.length > 0}
							invalidText={
								"La fecha de emisión no puede ser vacía"
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
							inputValue={avf.permisoCirculacion.fechaVencimiento}//{selectedItemData?.permisoCirculacion.fechaVencimiento || ""}
							isValid={dtpnc.fechaVencimiento?.length > 0}
							invalidText={
								"La fecha de vencimiento no puede ser vacía"
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

						<Button onClick={handleCloseDialog} className="btn-secundario submit">Volver</Button>
					</>
			</FormDiv>
          </DialogContent>
        </Dialog>
      )}	
	</Container>

	);
};