import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { RESTEndpoints } from "../Services/RestService";
import Lottie from "lottie-react";
import { FormDiv } from "../Utilities/FormDiv";
import { FormH2 } from "../Utilities/FormH2";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "../Utilities/CustomToolbar";
import { columnsEmpresas } from "../constants";
import truckAnimation from "../css/truck-day-night.json";
import manAnimation from "../css/man-account-icon.json";
import { FormH4 } from "../Utilities/FromH4";

export const Home = () => {
	const [cantViajesEnCurso, setCantViajesEnCurso] = useState(0);
	const [empresas, setEmpresas] = useState([]);
	const [quickFilterEmpresaValue, setQuickFilterEmpresaValue] = useState("");
	const [cantchoferes, setCantchoferes] = useState(0);

	const handleEmpresas = () => {
		axios
			.get(RESTEndpoints.publicService.validarEmpresas)
			.then(response => {
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

	const handleChoferes = () => {
		axios
			.get(RESTEndpoints.publicService.choferesRegistrados)
			.then(response => {
				setCantchoferes(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		handleEmpresas();
		handleViajesEnCurso();
		handleChoferes();
	}, []);

	return (
		<Container>
			<Row>
				<Col md={3} />
				<Col md={6}>
					<Lottie animationData={truckAnimation} />
				</Col>
				<Col md={3} />
			</Row>
			<Row className="pb-5">
				<Col
					md={12}
					className="d-flex align-items-center justify-content-center"
				>
					<h2>{cantViajesEnCurso} viajes en curso</h2>
				</Col>
			</Row>
			<Row>
				<Col
					md={6}
					className="py-4 bg-white rounded-4 border border-secondary-subtle"
				>
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
								placeholder: "Buscar por nombre",
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
						pageSizeOptions={[10, 25, 50]} // Agregado pageSizeOptions con tamaño de página 10
					/>
				</Col>
				<Col
					md={5}
					className="d-flex align-items-center justify-content-center"
				>
					<Row>
						<Col xs={5} sm={6}>
							<Lottie animationData={manAnimation} />
						</Col>
						<Col className="d-flex align-items-center justify-content-center">
							<h4>{cantchoferes} choferes registrados</h4>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};
