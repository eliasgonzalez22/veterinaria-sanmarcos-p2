// usuarioService: CRUD de usuarios contra la API (antes usaba localStorage).
// Los permisos los vuelve a comprobar el backend: listar, crear y desactivar son solo
// del ADMINISTRADOR, y un usuario común solo puede modificar su propia cuenta.
import { api } from './api'

// GET /usuarios -> arreglo de usuarios (si no es ADMINISTRADOR, el backend responde 403).
export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios')
  return respuesta.data
}

// POST /usuarios -> 201 con el usuario creado (409 si el correo ya existe).
export async function crearUsuario(dto) {
  const respuesta = await api.post('/usuarios', dto)
  return respuesta.data
}

// PUT /usuarios/{id} -> el usuario actualizado. Solo se envían los campos que cambian.
export async function actualizarUsuario(id, cambios) {
  const respuesta = await api.put(`/usuarios/${id}`, cambios)
  return respuesta.data
}

// DELETE /usuarios/{id} -> 204 sin cuerpo. Es un borrado lógico: la cuenta queda desactivada.
export async function desactivarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
}
