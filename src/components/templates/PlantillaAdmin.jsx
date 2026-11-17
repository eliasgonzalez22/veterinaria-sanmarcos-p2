import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Nav, Alert } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import { useSesion } from '../../context/SesionContext'
import { esPersonal, nombreRol, ROLES } from '../../utils/roles'

export default function PlantillaAdmin(props) {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const { sesion, salir: cerrarSesion } = useSesion()

  // Segunda barrera en la interfaz (la primera es RutaProtegida en App.jsx).
  // La seguridad real está en el backend, que responde 401/403.
  if (!esPersonal(sesion)) {
    return (
      <Container as="main" className="py-4">
        <Alert variant="warning">Esta sección es solo para el personal de la clínica.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </Container>
    )
  }

  // Marca el enlace de la página actual (clase "activo" y aria-current para lectores de pantalla).
  function esActual(ruta) {
    return ruta === '/admin' ? ubicacion.pathname === '/admin' : ubicacion.pathname.startsWith(ruta)
  }

  function propsEnlace(ruta) {
    return {
      href: ruta,
      onClick: (e) => ir(e, ruta),
      className: esActual(ruta) ? 'activo' : undefined,
      'aria-current': esActual(ruta) ? 'page' : undefined,
    }
  }

  function ir(evento, ruta) {
    evento.preventDefault()
    navigate(ruta)
  }

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <>
      <header className="bg-dark text-white">
        <Container className="d-flex flex-wrap align-items-center justify-content-between gap-2 py-2">
          <p className="h5 mb-0">Panel · Veterinaria San Marcos</p>
          <nav aria-label="Administración">
            <Nav>
              <Nav.Link {...propsEnlace('/admin')}>Citas</Nav.Link>
              <Nav.Link {...propsEnlace('/admin/servicios')}>Servicios</Nav.Link>
              <Nav.Link {...propsEnlace('/admin/resumen')}>Resumen</Nav.Link>
              {/* Gestionar usuarios es solo del Administrador (documento del caso, sección 0.2). */}
              {sesion.rol === ROLES.ADMINISTRADOR && (
                <Nav.Link {...propsEnlace('/admin/usuarios')}>Usuarios</Nav.Link>
              )}
            </Nav>
          </nav>
          <div className="d-flex align-items-center gap-2">
            <span className="small">{sesion.nombre} · {nombreRol(sesion.rol)}</span>
            <Boton variante="outline-light" onClick={salir}>Cerrar sesión</Boton>
          </div>
        </Container>
      </header>
      <Container as="main" className="py-4">{props.children}</Container>
    </>
  )
}
