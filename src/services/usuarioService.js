import { api } from './api'

export async function listarUsuarios() {
  const respuesta = await api.get('/usuarios')
  return respuesta.data
}

export async function crearUsuario(dto) {
  const respuesta = await api.post('/usuarios', dto)
  return respuesta.data
}

export async function actualizarUsuario(id, cambios) {
  const respuesta = await api.put(`/usuarios/${id}`, cambios)
  return respuesta.data
}

export async function desactivarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
}
