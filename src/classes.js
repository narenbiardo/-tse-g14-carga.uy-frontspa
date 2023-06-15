export class DtPermisoNacionalCirculacion {
	constructor(numero, fechaEmision, fechaVencimiento) {
		this.numero = numero;
		this.fechaEmision = fechaEmision;
		this.fechaVencimiento = fechaVencimiento;
	}
}

export class AgregarVehiculoForm {
	constructor(
		matricula,
		marcaVehiculo,
		modelo,
		peso,
		capacidad,
		permisoCirculacion, // DtPermisoNacionalCirculacion
		vencimientoITV // Fecha de vencimiento de la inspeccion tecnica vehicular
	) {
		this.matricula = matricula;
		this.marcaVehiculo = marcaVehiculo;
		this.modelo = modelo;
		this.peso = peso;
		this.capacidad = capacidad;
		this.permisoCirculacion = permisoCirculacion;
		this.vencimientoITV = vencimientoITV;
		this.nroEmpresa = "";
	}
}

export class VehiculoDto {
	constructor(
		matricula,
		nroEmpresa,
		marcaVehiculo,
		modelo,
		peso,
		capacidad,
		permisoCirculacion, // DtPermisoNacionalCirculacion
		vencimientoITV // Fecha de vencimiento de la inspeccion tecnica vehicular
	) {
		this.matricula = matricula;
		this.nroEmpresa = nroEmpresa;
		this.marcaVehiculo = marcaVehiculo;
		this.modelo = modelo;
		this.peso = peso;
		this.capacidad = capacidad;
		this.permisoCirculacion = permisoCirculacion;
		this.vencimientoITV = vencimientoITV;
	}
}

export class FirstTimeInput {
	constructor(
		matricula,
		marcaVehiculo,
		modelo,
		peso,
		capacidad,
		numero,
		fechaEmision,
		fechaVencimiento,
		vencimientoITV
	) {
		this.matricula = matricula;
		this.marcaVehiculo = marcaVehiculo;
		this.modelo = modelo;
		this.peso = peso;
		this.capacidad = capacidad;
		this.numero = numero;
		this.fechaEmision = fechaEmision;
		this.fechaVencimiento = fechaVencimiento;
		this.vencimientoITV = vencimientoITV;
	}
}

export class DtDireccionEmpresa {
	constructor(calle, km, nroPuerta) {
		this.calle = calle;
		this.km = km;
		this.nroPuerta = nroPuerta;
	}
}

export class EmpresaDto {
	constructor(direccionEmpresa, nombreEmpresa, nroEmpresa, razonSocial) {
		this.direccionEmpresa = direccionEmpresa;
		this.nombreEmpresa = nombreEmpresa;
		this.nroEmpresa = nroEmpresa;
		this.razonSocial = razonSocial;
	}
}

export class FirstTimeInputEmpresaDto {
	constructor(nroEmpresa, nombreEmpresa, calle, km, nroPuerta, razonSocial) {
		this.nroEmpresa = nroEmpresa;
		this.nombreEmpresa = nombreEmpresa;
		this.calle = calle;
		this.km = km;
		this.nroEmpresa = nroPuerta;
		this.razonSocial = razonSocial;
	}
}

export class DtDireccionPostal {
	constructor(calle, km, nroPuerta, departamento) {
		this.calle = calle;
		this.km = km;
		this.nroPuerta = nroPuerta;
		this.departamento = departamento;
	}
}

export class IngresarGuiaViajeForm {
	constructor(rubro, volumen, fechaHora, origen, destino, nroEmpresa) {
		this.rubro = rubro;
		this.volumen = volumen;
		this.fechaHora = fechaHora;
		this.origen = origen;
		this.destino = destino;
		this.nroEmpresa = nroEmpresa;
	}
}

export class FirstTimeInputIngresarGuiaViajeForm {
	constructor(
		rubro,
		volumen,
		fechaHora,
		origen,
		destino,
		nroEmpresa,
		calleOrigen,
		kmOrigen,
		nroPuertaOrigen,
		calleDestino,
		kmDestino,
		nroPuertaDestino
	) {
		this.rubro = rubro;
		this.volumen = volumen;
		this.fechaHora = fechaHora;
		this.origen = origen;
		this.destino = destino;
		this.nroEmpresa = nroEmpresa;
		this.calleOrigen = calleOrigen;
		this.kmOrigen = kmOrigen;
		this.nroPuertaOrigen = nroPuertaOrigen;
		this.calleDestino = calleDestino;
		this.kmDestino = kmDestino;
		this.nroPuertaDestino = nroPuertaDestino;
	}
}
