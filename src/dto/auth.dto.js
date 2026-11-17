// DTO de entrada: arma el cuerpo exacto que pide la API a partir de los datos del formulario
// (guía 20, sección 7). Deja pasar solo los campos del contrato.

// POST /auth/login
export function crearLoginRequestDto(formulario) {
  return {
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
  }
}

// POST /auth/registro. No lleva "rol": el servidor asigna DUENO.
export function crearRegistroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
  }
}
