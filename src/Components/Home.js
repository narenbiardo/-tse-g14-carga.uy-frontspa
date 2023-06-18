import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import Lottie from "lottie-react";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH4 } from "../Utilities/FromH4";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import { columnsEmpresas } from "../constants";
import truckAnimation from "../css/truck-day-night.json";

export const Home = () => {
	const [cantViajesEnCurso, setCantViajesEnCurso] = useState(0);
	const [empresas, setEmpresas] = useState([]);
	const [quickFilterEmpresaValue, setQuickFilterEmpresaValue] = useState("");

	const handleEmpresas = () => {
		axios
			.get(RESTEndpoints.publicService.validarEmpresas)
			.then(response => {
				//console.log(response.data);
				var empresasList = [];
				response.data.map(element => empresasList.push({ nombre: element }));
				setEmpresas(empresasList);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const getRowIdEmpresas = row => {
		return Math.random().toString();
	};

	const handleQuickFilterEmpresaValue = useCallback(
		value => {
			setQuickFilterEmpresaValue(value);
		},
		[quickFilterEmpresaValue]
	);

	const handleViajesEnCurso = () => {
		axios
			.get(RESTEndpoints.publicService.viajesEnCurso)
			.then(response => {
				setCantViajesEnCurso(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		handleEmpresas();
		handleViajesEnCurso();
	}, []);

	return (
		<FormDiv>
			<Container>
				<Row>
					<Col xs={3} />
					<Col xs={6}>
						<Lottie animationData={truckAnimation} />
					</Col>
					<Col xs={3} />
				</Row>
				<Row>
					<Col
						xs={12}
						className="d-flex align-items-center justify-content-center"
					>
						<h2>{cantViajesEnCurso} viajes en curso</h2>
					</Col>
				</Row>
			</Container>

			<FormH4 text={"Empresas"} />

			<DataGrid
				rows={empresas}
				columns={columnsEmpresas}
				checkboxSelection={false}
				hideFooterSelectedRowCount={true}
				onRowClick={p => console.log(p.row)}
				getRowId={getRowIdEmpresas}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				components={{
					Toolbar: CustomToolbar,
				}}
				componentsProps={{
					toolbar: {
						setQuickFilter: handleQuickFilterEmpresaValue,
						placeholder: "Buscar por empresa",
					},
				}}
				filterModel={{
					items: [
						{
							id: 1,
							field: "nombre",
							operator: "contains",
							value: quickFilterEmpresaValue,
						},
					],
				}}
				density="compact"
				autoHeight

				/*DISABLED pageSizeOptions={[10, 25, 50]}*/
			/>
		</FormDiv>
	);
};
