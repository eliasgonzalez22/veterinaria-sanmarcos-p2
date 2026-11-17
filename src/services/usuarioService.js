// usuarioService: CRUD de usuarios contra la API (antes usaba localStorage).
// Los permisos los vuelve a comprobar el backend: listar es solo para ADMINISTRADOR,
// y un usuario solo puede modificar su propia cuenta.
import { api } from './api'

// GET /usuarios -> arreglo de usuarios (solo ADMINISTRADOR; si no, el backend responde 403).
export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios')
  return respuesta.data
}

// PUT /usuarios/{id} -> el usuario actualizado. Solo se envían los campos que cambian.
export async function actualizarUsuario(id, cambios) {
  const respuesta = await api.put(`/usuarios/${id}`, cambios)
  return respuesta.data
}
