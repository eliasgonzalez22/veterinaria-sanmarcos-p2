// RutaProtegida: envuelve una página y decide si se puede mostrar.
// - Sin sesión: lleva al login y recuerda adónde quería ir la persona.
// - Con sesión pero sin el rol: muestra "sin permiso".
// Ocultar un botón o una ruta en React NO es seguridad: el backend vuelve a comprobar
// el token y el rol en cada solicitud (401 / 403). Esto es para la experiencia de uso.
import { Navigate, useLocation } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'
import { tieneRol } from '../utils/roles'
import SinPermiso from '../pages/SinPermiso'

export default function RutaProtegida(props) {
  const { sesion } = useSesion()
  const ubicacion = useLocation()

  if (!sesion) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />
  }

  if (!tieneRol(sesion, props.roles)) {
    return <SinPermiso />
  }

  return props.children
}
