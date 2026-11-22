import { api } from './api'
import { guardarSesion, limpiarSesion, actualizarUsuarioEnSesion } from './sesionService'

export async function iniciarSesion(dto) {
  const respuesta = await api.post('/auth/login', dto)
  guardarSesion(respuesta.data)
  return respuesta.data.usuario
}

export async function registrarUsuario(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}

export async function obtenerPerfil() {
  const respuesta = await api.get('/usuarios/yo')
  actualizarUsuarioEnSesion(respuesta.data)
  return respuesta.data
}

export function cerrarSesion() {
  limpiarSesion()
}
