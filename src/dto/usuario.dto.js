// DTO de entrada para el CRUD de usuarios del Administrador.

// POST /usuarios: el Administrador sí elige el rol (el registro público no).
export function crearUsuarioRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    clave: formulario.clave,
    rol: formulario.rol,
  }
}

// PUT /usuarios/{id}: solo viajan los campos que cambiaron respecto del usuario original.
// La contraseña se envía únicamente si se escribió una nueva.
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
