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
