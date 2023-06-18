import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { FormSelect } from "../Utilities/FormSelect";
import { FormTextInputAutocomplete } from "../Utilities/FormTextInputAutocomplete";
import { DataGrid } from "@mui/x-data-grid";
import { createDataGridTheme } from "@mui/x-data-grid-generator";
import { FormInputSubmit } from "../Utilities/FormInputSubmit";
import { FormInputDiv } from "../Utilities/FormInputDiv";
import { Button } from "react-bootstrap";
import { CustomToolbar } from "../Utilities/CustomToolbar";

/*
const vehiculos = [
	"ABC1111",
	"ABC2222",
	"ABC3333",
	"ABC4444",
	"ABC5555",
	"ABC6666",
	"ABC7777",
];
*/

const choferes = [
	{ id: "123", nombre: "Marcos" },
	{ id: "456", nombre: "Gabriel" },
	{ id: "789", nombre: "Lucas" },
];

/*
const guiasDeViaje = [
	{ id: "1", nombre: "Guia 1" },
	{ id: "2", nombre: "Guia 2" },
	{ id: "3", nombre: "Guia 3" },
];
*/

const columnsVehiculos = [
	{ field: "matricula", headerName: "Matricula", width: 100 },
	{ field: "marca", headerName: "Marca", width: 150 },
	{ field: "modelo", headerName: "Modelo", width: 100 },
];

const columnsGuiasDeViaje = [
	{ field: "id", headerName: "Id", width: 10 },
	{ field: "rubro", headerName: "Rubro", width: 150 },
	{ field: "kmOrigen", headerName: "Km Origen", width: 100 },
	{ field: "kmDestino", headerName: "Km Destino", width: 100 },
	{ field: "fecha", headerName: "Fecha", width: 90 },
	{ field: "hora", headerName: "Hora", width: 80 },
];

const columnsChoferes = [
	{ field: "id", headerName: "Id", width: 10 },
	{ field: "nombre", headerName: "Nombre", width: 150 },
];

class AsignarGuiaViajeForm {
	constructor(idGuiaViaje, cedulaChofer, matriculaVehiculo) {
		this.idGuiaViaje = idGuiaViaje;
		this.cedulaChofer = cedulaChofer;
		this.matriculaVehiculo = matriculaVehiculo;
	}
}

export const AsignarGuiaDeViaje = () => {
	const [agvf, setAgvf] = useState(new AsignarGuiaViajeForm());
	const [guiasDeViaje, setGuiasDeViaje] = useState([]);
	const [vehiculos, setVehiculos] = useState([]);
	const [quickFilterMatriculaValue, setQuickFilterMatriculaValue] =
		useState("");
	const [quickFilterRubroValue, setQuickFilterRubroValue] = useState("");

	const handleChangeAgvf = row => {
		/*if (e.target) {
			const { name, value } = e.target;
			setAgvf(prevData => ({ ...prevData, [name]: value }));
		} else {
			//e.target will be null in TextInput component
			setAgvf(prevData => ({ ...prevData, ["matriculaVehiculo"]: e }));
		}*/
		console.log(row);
		if (row.id) {
			setAgvf(prevData => ({ ...prevData, ["idGuiaViaje"]: row.id }));
		} else {
			console.log("No Rubro");
		}
	};

	const handleGuiasDeViaje = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarGuiasAsignables)
			.then(response => {
				//console.log(response.data);
				let gdv = [];
				response.data.map(guia => {
					gdv.push({
						id: guia.idGuiaViaje,
						rubro: guia.rubro.nombre,
						kmOrigen: guia.origen.km,
						kmDestino: guia.destino.km,
						fecha: new Date(guia.fechaHora).toLocaleDateString(),
						hora: new Date(guia.fechaHora).toLocaleTimeString(),
					});
				});
				setGuiasDeViaje(gdv);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleVehiculos = () => {
		axios
			.get(RESTEndpoints.encargadoService.listarVehiculos)
			.then(response => {
				let vList = [];
				response.data.map(v => {
					vList.push({
						matricula: v.matricula,
						marca: v.marcaVehiculo.nombre,
						modelo: v.modelo,
					});
				});
				setVehiculos(vList);
				console.log(vList);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const getRowIdVehiculo = row => {
		return row.matricula + row.modelo;
	};

	const getRowIdGuiaDeViaje = row => {
		return Math.random().toString();
	};

	const getRowIdChoferes = row => {
		return Math.random().toString();
	};

	const handleSetQuickFilterMatricula = useCallback(
		value => {
			setQuickFilterMatriculaValue(value);
		},
		[setQuickFilterMatriculaValue]
	);

	const handleSetQuickFilterRubro = useCallback(
		value => {
			setQuickFilterRubroValue(value);
		},
		[setQuickFilterRubroValue]
	);

	useEffect(() => {
		handleGuiasDeViaje();
		handleVehiculos();
	}, []);

	return (
		<FormDiv>
			<FormH2 text="Asignar Guía de Viaje" />

			{agvf.idGuiaViaje ? (
				<>
					<label>Chofer</label>

					<DataGrid
						rows={choferes}
						columns={columnsChoferes}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => handleChangeAgvf(p.row)}
						getRowId={getRowIdChoferes}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterRubro,
								placeholder: "Buscar por nombre",
							},
						}}
						filterModel={{
							items: [
								{
									id: 1,
									field: "rubro",
									operator: "contains",
									value: quickFilterRubroValue,
								},
							],
						}}
						density="compact"
						autoHeight

						/*DISABLED pageSizeOptions={[10, 25, 50]}*/
					/>

					<label>Vehículo</label>

					<DataGrid
						rows={vehiculos}
						columns={columnsVehiculos}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => console.log(p)}
						getRowId={getRowIdVehiculo}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterMatricula,
								placeholder: "Buscar por matricula",
							},
						}}
						filterModel={{
							items: [
								{
									id: 1,
									field: "matricula",
									operator: "contains",
									value: quickFilterMatriculaValue,
								},
							],
						}}
						density="compact"

						/*DISABLED pageSizeOptions={[10, 25, 50]}*/
					/>

					{/*<FormTextInputAutocomplete
						htmlFor="matriculaVehiculo"
						label="Vehículo"
						name="matriculaVehiculo"
						form="vehiculoForm"
						onChangeHandler={handleChangeAgvf}
						optionArray={vehiculos.map(v => v.matricula)}
						maxOptionNumber={5}
					/>*/}
					<div>
						<Button type="submit" className="btn-principal submit mt-2 mb-2">
							{" "}
							Enviar{" "}
						</Button>
					</div>
					<div>
						<Button type="submit" className="btn-secundario submit mt-2 mb-2">
							{" "}
							Volver{" "}
						</Button>
					</div>
					{/* 						
						<button
							onClick={() => setAgvf(new AsignarGuiaViajeForm())}
							className="btn-secundario m-3"
						>
							Volver
						</button>
					</div>
						</button> */}
					{/* //</div> */}
				</>
			) : (
				<>
					<label>Guía de Viaje</label>
					<DataGrid
						rows={guiasDeViaje}
						columns={columnsGuiasDeViaje}
						checkboxSelection={false}
						hideFooterSelectedRowCount={true}
						onRowClick={p => handleChangeAgvf(p.row)}
						getRowId={getRowIdGuiaDeViaje}
						initialState={{
							pagination: { paginationModel: { pageSize: 10 } },
						}}
						components={{
							Toolbar: CustomToolbar,
						}}
						componentsProps={{
							toolbar: {
								setQuickFilter: handleSetQuickFilterRubro,
								placeholder: "Buscar por rubro",
							},
						}}
						filterModel={{
							items: [
								{
									id: 1,
									field: "rubro",
									operator: "contains",
									value: quickFilterRubroValue,
								},
							],
						}}
						density="compact"
						autoHeight

						/*DISABLED pageSizeOptions={[10, 25, 50]}*/
					/>
				</>
				/*<FormInputDiv>
					<label htmlFor="idGuiaViaje">Guía de Viaje</label>
					
					<select
						name="idGuiaViaje"
						form="idGuiaViajeForm"
						onChange={handleChangeAgvf}
						defaultValue=""
						required
						style={{
							marginLeft: "10px",
							padding: "5px",
							border: "none",
							borderBottom: "2px solid #16b7b9",
							width: "250px",
							fontSize: "16px",
							color: "#555",
						}}
					>
						<option value="" disabled>
							"Seleccionar Guía de Viaje"
						</option>

						{guiasDeViaje.map(gv => (
							<option value={gv.idGuiaViaje} key={Math.random()}>
								{"Calle: " +
									gv.destino.calle +
									", Km: " +
									gv.destino.km +
									", Nº Puerta: " +
									gv.destino.nroPuerta +
									", Fecha: " +
									new Date(gv.fechaHora).toLocaleString()}
							</option>
						))}
						</select>
				</FormInputDiv>*/
				/*<FormSelect
					htmlFor="idGuiaViaje"
					label="Guía de Viaje"
					name="idGuiaViaje"
					form="idGuiaViajeForm"
					onChangeHandler={handleChangeAgvf}
					optionDisabled="Seleccionar Guía de Viaje"
					valueArray={guiasDeViaje}
				/>*/
			)}
		</FormDiv>
	);
};
