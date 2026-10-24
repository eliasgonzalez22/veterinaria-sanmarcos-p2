import { useNavigate } from 'react-router-dom'
import { Container, Nav, Alert } from 'react-bootstrap'
import Boton from '../atoms/Boton'
import { obtenerSesion, cerrarSesion } from '../../services/usuarioService'

export default function PlantillaAdmin(props) {
  const navigate = useNavigate()
  const sesion = obtenerSesion()

  if (!sesion || sesion.rol !== 'recepcionista') {
    return (
      <Container as="main" className="py-4">
        <Alert variant="warning">Esta sección es solo para la recepción.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </Container>
    )
  }

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <>
      <header className="bg-dark text-white">
        <Container className="d-flex flex-wrap align-items-center justify-content-between py-2">
          <p className="h5 mb-0">Panel · Veterinaria San Marcos</p>
          <nav aria-label="Administración">
            <Nav>
              <Nav.Link href="/admin" onClick={(e) => { e.preventDefault(); navigate('/admin') }}>
                Citas
              </Nav.Link>
              <Nav.Link href="/admin/servicios" onClick={(e) => { e.preventDefault(); navigate('/admin/servicios') }}>
                Servicios
              </Nav.Link>
            </Nav>
          </nav>
          <Boton variante="outline-light" onClick={salir}>Cerrar sesión</Boton>
        </Container>
      </header>
      <Container as="main" className="py-4">{props.children}</Container>
    </>
  )
}