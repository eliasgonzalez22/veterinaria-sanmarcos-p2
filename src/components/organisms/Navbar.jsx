import BuscadorServicios from '../molecules/BuscadorServicios'

export default function Navbar(props) {
  function ir(evento, ruta) {
    evento.preventDefault()
    props.onNavegar(ruta)
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-success" aria-label="Principal">
        <div className="container">
          <a className="navbar-brand" href="/" onClick={(e) => ir(e, '/')}>
            🐾 Veterinaria San Marcos
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={(e) => ir(e, '/')}>Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/servicios" onClick={(e) => ir(e, '/servicios')}>Servicios</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </a>
                <ul className="dropdown-menu">
                  {props.categorias.map((c) => (
                    <li key={c}>
                      <a
                        className="dropdown-item"
                        href={`/categoria/${c}`}
                        onClick={(e) => ir(e, `/categoria/${encodeURIComponent(c)}`)}
                      >
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <BuscadorServicios onBuscar={props.onBuscar} />
          </div>
        </div>
      </nav>
    </header>
  )
}