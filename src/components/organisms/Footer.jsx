export default function Footer(props) {
  function irAlInicio(evento) {
    evento.preventDefault()
    props.onNavegar('/')
  }

  return (
    <footer className="text-center text-muted py-3 border-top mt-4">
      <p className="mb-1">© 2026 Veterinaria San Marcos · Rancagua</p>
      <a href="/" onClick={irAlInicio}>Volver al inicio</a>
    </footer>
  )
}