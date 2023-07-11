import { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import "react-autocomplete-input/dist/bundle.css";
import { fti, columnsViajes, columnsPesajes } from "../constants";
import { FormH4 } from "../Utilities/FromH4";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import Container from "@mui/material/Container";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ConsultarPesajesViajes = () => {
	const [loading, setLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemData, setSelectedItemData] = useState(null);
	const [viajes, setViajes] = useState([]);
	const [pesajes, setPesajes] = useState([]);
	const [firstTimeInput, setfirstTimeInput] = useState(fti);
	const [quickFilterViajeValue, setquickFilterViajeValue] = useState("");
	const [quickFilterPesajeValue, setquickFilterPesajeValue] = useState("");

	const handleEditClick = (event, params) => {
		event.stopPropagation();
		handlePesajesViaje(params.id);
		setSelectedItem(params);
		setSelectedItemData(params);
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		axios
			.get(RESTEndpoints.funcionarioService.monitoreoViajes)
			.then(response => {
				var viajes = [];
				response.data.map(v =>
					viajes.push({
						id: v.id,
						choferCedula: v.choferCedula,
						matriculaVehiculo: v.matriculaVehiculo,
						fechaHoraInicio: new Date(v.fechaHoraInicio).toLocaleString(),
						fechaHoraFin: new Date(v.fechaHoraFin).toLocaleString(),
					})
				);
				setViajes(viajes);
			})
			.catch(error => {
				if (
					error.response.data === "No existen viajes registrados en el sistema"
				)
					setViajes([]);
				console.log(error);
			});
	}, [loading]);

	const handlePesajesViaje = idViaje => {
		axios
			.get(RESTEndpoints.funcionarioService.monitoreoPesajes + idViaje)
			.then(response => {
				var pesajes = [];
				response.data.map(p =>
					pesajes.push({
						id: p.id,
						fecha: new Date(p.fecha).toLocaleString(),
						peso: p.peso,
					})
				);
				setPesajes(pesajes);
			})
			.catch(error => {
				if (
					error.response.data ===
					"No existen pesajes registrados para el viaje seleccionado en el sistema"
				)
					setPesajes([]);
				console.log(error);
			});
	};

	const getRowId = row => {
		return Math.random().toString();
	};

	const handlequickFilterViajeValue = useCallback(
		value => {
			setquickFilterViajeValue(value);
		},
		[quickFilterViajeValue]
	);

	const handlequickFilterPesajeValue = useCallback(
		value => {
			setquickFilterPesajeValue(value);
		},
		[quickFilterPesajeValue]
	);

	useEffect(() => {
		//handleViajes();
	}, []);

	const getRowClassName = params => {
		return params.indexRelativeToCurrentPage % 2 === 0
			? "striped-row-even"
			: "striped-row-odd";
	};

	return (
		<Container className="form-container shadow-dreamy">
			<FormH4 text={"Viajes"} />
			<DataGrid
				getRowClassName={getRowClassName}
				rows={viajes}
				columns={columnsViajes}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={(params, event) => {
					if (event.target.classList.contains("edit-icon")) {
						handleEditClick(event, params.row);
					}
				}}
				getRowId={getRowId}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				slots={{
					toolbar: CustomToolbar,
				}}
				slotProps={{
					toolbar: {
						setQuickFilter: handlequickFilterViajeValue,
						placeholder: "Buscar por chofer",
					},
				}}
				filterModel={{
					items: [
						{
							id: 1,
							field: "choferCedula",
							operator: "contains",
							value: quickFilterViajeValue,
						},
					],
				}}
				autoHeight
			/>

			{selectedItem && (
				<Dialog
					open={isOpen}
					onClose={handleCloseDialog}
					maxWidth="sm"
					fullWidth
					classes={{ paper: "border-14" }}
				>
					<DialogTitle className="dialog-title">Viaje</DialogTitle>
					<DialogContent className="dialog">
						<p className="dialog-subtitle">Lista de Pesajes</p>
						<DataGrid
							getRowClassName={getRowClassName}
							rows={pesajes}
							columns={columnsPesajes}
							checkboxSelection={false}
							hideFooterSelectedRowCount={true}
							getRowId={getRowId}
							initialState={{
								pagination: { paginationModel: { pageSize: 10 } },
							}}
							slots={{
								toolbar: CustomToolbar,
							}}
							slotProps={{
								toolbar: {
									setQuickFilter: handlequickFilterPesajeValue,
									placeholder: "Buscar por peso",
								},
							}}
							filterModel={{
								items: [
									{
										id: 1,
										field: "peso",
										operator: "contains",
										value: quickFilterPesajeValue,
									},
								],
							}}
							autoHeight
						/>
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							size="medium"
							className="dialog-close-btn"
							startIcon={<CloseIcon />}
							onClick={handleCloseDialog}
						>
							CERRAR
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
};
