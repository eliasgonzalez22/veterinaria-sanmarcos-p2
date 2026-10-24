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
              <Nav.Link href="/login" onClick={(e) => ir(e, '/login')}>Ingresar</Nav.Link>
            </Nav>
            <BuscadorServicios onBuscar={props.onBuscar} />
          </BarraNav.Collapse>
        </Container>
      </BarraNav>
    </header>
  )
}