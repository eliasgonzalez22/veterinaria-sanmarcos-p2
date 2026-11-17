// SesionContext: comparte la sesión entre todas las pantallas (navbar, panel, páginas).
// Es el puente entre authService (la API) y React: cuando la sesión cambia,
// todos los componentes que la usan se vuelven a dibujar.
import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { obtenerSesion, obtenerExpiracion, actualizarUsuarioEnSesion } from '../services/sesionService'
import { EVENTO_SESION_VENCIDA } from '../services/api'

const SesionContext = createContext(null)

const AVISO_VENCIDA = 'Tu sesión venció. Ingresa nuevamente.'

export function SesionProvider(props) {
  // Al recargar la página, la sesión se recupera desde sessionStorage (si el token sigue vigente).
  const [sesion, setSesion] = useState(() => obtenerSesion())
  const [aviso, setAviso] = useState('')

  // 1) El interceptor de Axios avisa cuando el backend responde 401 a una solicitud con token.
  useEffect(() => {
    function alVencer() {
      setSesion(null)
      setAviso(AVISO_VENCIDA)
    }
    window.addEventListener(EVENTO_SESION_VENCIDA, alVencer)
    // Limpieza al desmontar (ciclo de vida, guía 11): se quita el listener.
    return () => window.removeEventListener(EVENTO_SESION_VENCIDA, alVencer)
  }, [])

  // 2) Cierra la sesión justo cuando vence el token, aunque la persona no haga nada.
  useEffect(() => {
    if (!sesion) return undefined
    const expira = obtenerExpiracion()
    if (!expira) return undefined
    const temporizador = setTimeout(() => {
      authService.cerrarSesion()
      setSesion(null)
      setAviso(AVISO_VENCIDA)
    }, Math.max(expira - Date.now(), 0))
    return () => clearTimeout(temporizador)
  }, [sesion])

  async function ingresar(dto) {
    const usuario = await authService.iniciarSesion(dto)
    setAviso('')
    setSesion(usuario)
    return usuario
  }

  function registrar(dto) {
    return authService.registrarUsuario(dto)
  }

  function salir() {
    authService.cerrarSesion()
    setSesion(null)
  }

  // Después de editar el perfil: actualiza los datos sin pedir un token nuevo.
  function actualizarSesion(usuario) {
    actualizarUsuarioEnSesion(usuario)
    setSesion(usuario)
  }

  return (
    <SesionContext.Provider
      value={{ sesion, aviso, ingresar, registrar, salir, actualizarSesion, limpiarAviso: () => setAviso('') }}
    >
      {props.children}
    </SesionContext.Provider>
  )
}

// Hook propio: const { sesion, ingresar, salir } = useSesion()
export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider')
  }
  return contexto
}
