// authService: inicio de sesión, registro y perfil contra la API del backend.
// Cada función usa la instancia "api" y devuelve respuesta.data (el DTO de salida).
import { api } from './api'
import { guardarSesion, limpiarSesion, actualizarUsuarioEnSesion } from './sesionService'

// POST /auth/login -> { token, tipo, expiraEnSegundos, usuario }
// Guarda la sesión y devuelve el usuario (sin contraseña ni hash).
export async function iniciarSesion(dto) {
  const respuesta = await api.post('/auth/login', dto)
  guardarSesion(respuesta.data)
  return respuesta.data.usuario
}

// POST /auth/registro -> 201 con el usuario creado. El rol lo asigna el servidor (DUENO).
export async function registrarUsuario(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}

// GET /usuarios/yo -> datos del usuario del token (no se confía en un id enviado por el cliente).
export async function obtenerPerfil() {
  const respuesta = await api.get('/usuarios/yo')
  actualizarUsuarioEnSesion(respuesta.data)
  return respuesta.data
}

// Cerrar sesión: el token se borra del navegador. Una copia ya emitida sigue siendo válida
// hasta su vencimiento (60 min), porque el backend no guarda una lista de tokens revocados.
export function cerrarSesion() {
  limpiarSesion()
}
