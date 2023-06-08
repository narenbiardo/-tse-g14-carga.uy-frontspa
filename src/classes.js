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
