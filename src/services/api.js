import axios from 'axios'
import { obtenerToken, limpiarSesion } from './sesionService'

export const EVENTO_SESION_VENCIDA = 'sesion-vencida'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = obtenerToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
