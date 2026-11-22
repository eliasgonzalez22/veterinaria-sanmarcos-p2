
export function crearLoginRequestDto(formulario) {
  return {
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
  }
}

export function crearRegistroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
  }
}
