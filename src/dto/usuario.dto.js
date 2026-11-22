
export function crearUsuarioRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
    rol: formulario.rol,
  }
}

export function actualizarUsuarioRequestDto(formulario, original) {
  const cambios = {}
  const nombre = formulario.nombre.trim()
  const email = formulario.email.trim().toLowerCase()
  if (nombre !== original.nombre) cambios.nombre = nombre
  if (email !== original.email) cambios.email = email
  if (formulario.clave) cambios.clave = formulario.clave
  if (formulario.rol !== original.rol) cambios.rol = formulario.rol
  if (formulario.activo !== original.activo) cambios.activo = formulario.activo
  return cambios
}
