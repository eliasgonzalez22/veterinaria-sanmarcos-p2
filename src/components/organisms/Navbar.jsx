import { Container, Navbar as BarraNav, Nav, NavDropdown } from 'react-bootstrap'
import BuscadorServicios from '../molecules/BuscadorServicios'
import { esPersonal } from '../../utils/roles'

export default function Navbar(props) {
  function ir(evento, ruta) {
    evento.preventDefault()
    props.onNavegar(ruta)
  }

  function esActual(ruta) {
    const actual = props.rutaActual || ''
    return ruta === '/' ? actual === '/' : actual.startsWith(ruta)
  }

  function enlace(ruta) {
    return {
      href: ruta,
      onClick: (e) => ir(e, ruta),
      className: esActual(ruta) ? 'activo' : undefined,
      'aria-current': esActual(ruta) ? 'page' : undefined,
    }
  }

  return (
    <header>
      <BarraNav expand="xl" variant="dark" className="barra-principal" aria-label="Principal">
        <Container>
          <BarraNav.Brand href="/" onClick={(e) => ir(e, '/')}>
            🐾 Veterinaria San Marcos
          </BarraNav.Brand>
          <BarraNav.Toggle aria-controls="menuPrincipal" aria-label="Abrir menú" />
          <BarraNav.Collapse id="menuPrincipal">
            <Nav className="me-auto">
              <Nav.Link {...enlace('/')}>Inicio</Nav.Link>
              <Nav.Link {...enlace('/servicios')}>Servicios</Nav.Link>
              <Nav.Link {...enlace('/contacto')}>Contacto</Nav.Link>
              <Nav.Link {...enlace('/ofertas')}>Ofertas</Nav.Link>
              <Nav.Link {...enlace('/blog')}>Blog</Nav.Link>
              <Nav.Link {...enlace('/nosotros')}>Nosotros</Nav.Link>
              <NavDropdown title="Categorías" id="menu-categorias" active={esActual('/categoria')}>
                {props.categorias.map((c) => (
                  <NavDropdown.Item
                    key={c}
                    href={`/categoria/${c}`}
                    onClick={(e) => ir(e, `/categoria/${encodeURIComponent(c)}`)}
                  >
                    {c}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {props.sesion ? (
                <>
                  {esPersonal(props.sesion) ? (
                    <Nav.Link {...enlace('/admin')}>Panel</Nav.Link>
                  ) : (
                    <Nav.Link {...enlace('/mis-citas')}>Mis citas</Nav.Link>
                  )}
                  <Nav.Link {...enlace('/perfil')}>Perfil</Nav.Link>
                  <Nav.Link
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      props.onSalir()
                    }}
                  >
                    Cerrar sesión ({props.sesion.nombre})
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link {...enlace('/login')}>Ingresar</Nav.Link>
                  <Nav.Link {...enlace('/registro')}>Crear cuenta</Nav.Link>
                </>
              )}
            </Nav>
            <BuscadorServicios onBuscar={props.onBuscar} />
          </BarraNav.Collapse>
        </Container>
      </BarraNav>
    </header>
  )
}