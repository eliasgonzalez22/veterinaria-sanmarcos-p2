import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { obtenerSesion, obtenerExpiracion, actualizarUsuarioEnSesion } from '../services/sesionService'
import { EVENTO_SESION_VENCIDA } from '../services/api'

const SesionContext = createContext(null)

const AVISO_VENCIDA = 'Tu sesión venció. Ingresa nuevamente.'

export function SesionProvider(props) {
  const [sesion, setSesion] = useState(() => obtenerSesion())
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    function alVencer() {
      setSesion(null)
      setAviso(AVISO_VENCIDA)
    }
    window.addEventListener(EVENTO_SESION_VENCIDA, alVencer)
    return () => window.removeEventListener(EVENTO_SESION_VENCIDA, alVencer)
  }, [])

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

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider')
  }
  return contexto
}
