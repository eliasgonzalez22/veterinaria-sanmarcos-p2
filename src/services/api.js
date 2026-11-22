// api: la ÚNICA instancia de Axios del proyecto (guía 20, sección 7).
// Los componentes no conocen Axios ni la dirección del backend: llaman a los services.
import axios from 'axios'
import { obtenerToken, limpiarSesion } from './sesionService'

// Nombre del evento que avisa a la interfaz que el backend rechazó el token (401).
export const EVENTO_SESION_VENCIDA = 'sesion-vencida'

export const api = axios.create({
  // Vite lee VITE_API_URL del archivo .env al compilar (ver .env.example).
  // Por defecto es una ruta relativa: el proxy de Vite la reenvía al backend (vite.config.js).
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  // Si el backend no responde en 10 segundos, Axios rechaza con error.code = 'ECONNABORTED'.
  timeout: 10000,
})

// Antes de cada solicitud: si hay sesión, agrega "Authorization: Bearer <token>".
api.interceptors.request.use((config) => {
  const token = obtenerToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Después de cada respuesta con error: si mandamos token y el backend respondió 401,
// el token venció o fue alterado. Se borra la sesión y se avisa a la interfaz.
// (El 401 del login no entra aquí, porque esa solicitud no lleva token).
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const enviabaToken = Boolean(error.config && error.config.headers && error.config.headers.Authorization)
    if (error.response && error.response.status === 401 && enviabaToken) {
      limpiarSesion()
      window.dispatchEvent(new Event(EVENTO_SESION_VENCIDA))
    }
    return Promise.reject(error)
  }
)
