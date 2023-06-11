import { useState, useEffect } from "react";
import { mainColor } from "../constants";
import { EmpresaDto, DtDireccionEmpresa } from "../classes";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import { ftie } from "../constants";
import { FormH2 } from "../Utilities/FormH2";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { FormInputText } from "../Utilities/FormInputText";
import { FormH4 } from "../Utilities/FromH4";
import { FormInputNumber } from "../Utilities/FormInputNumber";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";

export const EditarEmpresa = () => {
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

	const handleEditEmpresa = () => {
		axios
			.post(RESTEndpoints.encargadoService.modEmpresa, edto)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
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
			<FormH2 text={"Editar Empresa"} />

			<FormInputDiv>
				<label htmlFor="numero">Número</label>
				<input
					type="text"
					name="numero"
					value={edto.nroEmpresa}
					disabled
					style={{
						marginLeft: "10px",
						padding: "5px",
						border: "none",
						borderBottom: "2px solid " + mainColor,
						width: "250px",
						fontSize: "16px",
						color: "#555",
					}}
				/>
			</FormInputDiv>

			<FormInputText
				htmlFor="nombreEmpresa"
				label="Nombre"
				name="nombreEmpresa"
				onChangeHandler={handleChangeEdto}
				inputValue={edto.nombreEmpresa}
				isValid={edto.nombreEmpresa !== ""}
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

			<FormH4 text="Dirección" />

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

			<FormInputSubmit
				onClickHandler={handleEditEmpresa}
				value="Enviar"
				validForm={
					edto.nombreEmpresa !== "" &&
					edto.razonSocial !== "" &&
					edto.direccionEmpresa.calle !== "" > 0 &&
					edto.direccionEmpresa.km !== "" &&
					edto.direccionEmpresa.nroPuerta !== ""
				}
			/>
		</>
	);
};
