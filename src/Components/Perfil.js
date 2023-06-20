import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useAuth } from "../Services/useAuth";
import {
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardText,
	MDBCardBody,
	MDBCardImage,
	MDBBtn,
	MDBBreadcrumb,
	MDBBreadcrumbItem,
	MDBProgress,
	MDBProgressBar,
	MDBIcon,
	MDBListGroup,
	MDBListGroupItem
  } from 'mdb-react-ui-kit';
	import astronaut from '../css/astronaut.png'


export const Perfil = () => {
	const { user } = useAuth();
	const jwtDecoded = jwt_decode(cookies.get("code"));
	const nombre =jwtDecoded.nombre;
	const apellido =jwtDecoded.apellido;
	const cedula =jwtDecoded.cedula;
	const email =jwtDecoded.email;
	const nroEmpresa =jwtDecoded.nroEmpresa;


  return (
    <section>
      <MDBContainer className="py-5 perfil shadow-dreamy">

        <MDBRow>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={astronaut}
                  alt="avatar"
                  className="rounded-circle perfil-image"
                  fluid />
                <p className="text-primary mb-1 mt-3">{user === 1 ? "Encargado" : "Funcionario"}</p>
                <p className="text-muted mb-4">Montevideo, Uruguay</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">{nombre}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
								<MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Apellido</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">{apellido}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Telefono</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">(+598) 098 342 435</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
								{user === 1 && (
									<>
										<MDBRow>
											<MDBCol sm="3">
												<MDBCardText>Empresa</MDBCardText>
											</MDBCol>
											<MDBCol sm="9" className="text-center">
												<MDBCardText className="text-muted">{nroEmpresa}</MDBCardText>
											</MDBCol>
										</MDBRow>
										<hr />
									</>
								)}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Cedula</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">{cedula}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Direccion</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9" className="text-center">
                    <MDBCardText className="text-muted">Av. Gonzalo Ramirez 3818</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Estadisticas personaoles</span> </MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Guias ingresadas</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Guias asignadas</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Vehiculos ingresados</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Vehiculos dado de baja</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}