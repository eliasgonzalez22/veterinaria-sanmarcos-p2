import { Container, Navbar as BarraNav, Nav, NavDropdown } from 'react-bootstrap'
import BuscadorServicios from '../molecules/BuscadorServicios'

export default function Navbar(props) {
  function ir(evento, ruta) {
    evento.preventDefault()
    props.onNavegar(ruta)
  }

  return (
    <header>
      <BarraNav expand="md" bg="success" variant="dark" aria-label="Principal">
        <Container>
          <BarraNav.Brand href="/" onClick={(e) => ir(e, '/')}>
            🐾 Veterinaria San Marcos
          </BarraNav.Brand>
          <BarraNav.Toggle aria-controls="menuPrincipal" aria-label="Abrir menú" />
          <BarraNav.Collapse id="menuPrincipal">
            <Nav className="me-auto">
              <Nav.Link href="/" onClick={(e) => ir(e, '/')}>Inicio</Nav.Link>
              <Nav.Link href="/servicios" onClick={(e) => ir(e, '/servicios')}>Servicios</Nav.Link>
              <Nav.Link href="/contacto" onClick={(e) => ir(e, '/contacto')}>Contacto</Nav.Link>
              <Nav.Link href="/ofertas" onClick={(e) => ir(e, '/ofertas')}>Ofertas</Nav.Link>
              <Nav.Link href="/blog" onClick={(e) => ir(e, '/blog')}>Blog</Nav.Link>
              <NavDropdown title="Categorías" id="menu-categorias">
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
                  {props.sesion.rol === 'recepcionista' ? (
                    <Nav.Link href="/admin" onClick={(e) => ir(e, '/admin')}>Panel</Nav.Link>
                  ) : (
                    <Nav.Link href="/mis-citas" onClick={(e) => ir(e, '/mis-citas')}>Mis citas</Nav.Link>
                  )}
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
                  <Nav.Link href="/login" onClick={(e) => ir(e, '/login')}>Ingresar</Nav.Link>
                  <Nav.Link href="/registro" onClick={(e) => ir(e, '/registro')}>Crear cuenta</Nav.Link>
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