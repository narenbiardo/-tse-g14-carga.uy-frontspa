import { useState, useEffect } from "react";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { ftie } from "../constants";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormDiv } from "../Utilities/FormDiv";
import TextField from '@mui/material/TextField';

export const EditarEmpresa = ({ empresa, handleEditEmpresa }) => {
	const [edto, setEdto] = useState(
		new EmpresaDto(new DtDireccionEmpresa("", "", ""), "", "", "")
	);
	const [firstTimeInput, setfirstTimeInput] = useState(ftie);

	const handleChangeEdto = e => {
		const { name, value } = e.target;
		setEdto(prevData => ({ ...prevData, [name]: value }));
		setfirstTimeInput(prevData => ({ ...prevData, [name]: value }));

		if (name === "km") {
			setEdto(prevData => ({
				...prevData,
				direccionEmpresa: {
					...prevData.direccionEmpresa,
					km: value,
				},
			}));
		} else if (name === "calle") {
			setEdto(prevData => ({
				...prevData,
				direccionEmpresa: {
					...prevData.direccionEmpresa,
					calle: value,
				},
			}));
		} else if (name === "nroPuerta") {
			setEdto(prevData => ({
				...prevData,
				direccionEmpresa: {
					...prevData.direccionEmpresa,
					nroPuerta: value,
				},
			}));
		} else {
			setEdto(prevData => ({ ...prevData, [name]: value }));
		}
	};

	const handleFirstTimeInput = e => {
		const { name } = e.target;
		setfirstTimeInput(prevData => ({ ...prevData, [name]: false }));
	};

	useEffect(() => {
		axios
			.get(RESTEndpoints.encargadoService.getEmpresa)
			.then(response => {
				setEdto(
					new EmpresaDto(
						response.data.direccionEmpresa,
						response.data.nombreEmpresa,
						response.data.nroEmpresa,
						response.data.razonSocial
					)
				);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<FormDiv onSubmit={(event) => handleEditEmpresa(event, edto)} id="editar-empresa-form">
				<p className="dialog-subtitle">Datos Empresa</p>

				<FormInputDiv>
					<TextField 
						id="outlined-basic" 
						label="Numero" 
						variant="outlined" 
						fullWidth 
						disabled
						value={edto.nroEmpresa}
						InputLabelProps={{ shrink: true }}
						type="text"
						size="small"
					/>
				</FormInputDiv>

				<FormInputText
					htmlFor="nombreEmpresa"
					label="Nombre"
					name="nombreEmpresa"
					onChangeHandler={handleChangeEdto}
					inputValue={edto.nombreEmpresa || ""}
					isValid={edto.nroEmpresa !== ""}
					invalidText={"El nombre no puede estar vacío"}
					firstTime={firstTimeInput.nombreEmpresa}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputNumber
					htmlFor="razonSocial"
					label="Razón Social"
					name="razonSocial"
					onChangeHandler={handleChangeEdto}
					inputValue={edto.razonSocial || ""}
					isValid={edto.razonSocial !== ""}
					invalidText={"La razón social no puede ser vacía"}
					firstTime={firstTimeInput.nroPuerta}
					handleFirstTime={handleFirstTimeInput}
				/>

				<p className="dialog-subtitle">Direccion</p>

				<FormInputText
					htmlFor="calle"
					label="Calle"
					name="calle"
					onChangeHandler={handleChangeEdto}
					inputValue={edto.direccionEmpresa.calle || ""}
					isValid={edto.direccionEmpresa.calle !== ""}
					invalidText={"La calle no puede ser vacía"}
					firstTime={edto.calle}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputText
					htmlFor="km"
					label="Kilómetro"
					name="km"
					onChangeHandler={handleChangeEdto}
					inputValue={edto.direccionEmpresa.km || ""}
					isValid={edto.direccionEmpresa.km !== ""}
					invalidText={"El kilómetro no puede ser vacío"}
					firstTime={edto.km}
					handleFirstTime={handleFirstTimeInput}
				/>

				<FormInputNumber
					htmlFor="nroPuerta"
					label="Número de puerta"
					name="nroPuerta"
					onChangeHandler={handleChangeEdto}
					inputValue={edto.direccionEmpresa.nroPuerta || ""}
					isValid={edto.direccionEmpresa.nroPuerta !== ""}
					invalidText={"El número de puerta no puede ser vacío"}
					firstTime={firstTimeInput.nroPuerta}
					handleFirstTime={handleFirstTimeInput}
				/>
			</FormDiv>
		</>
	);
};
