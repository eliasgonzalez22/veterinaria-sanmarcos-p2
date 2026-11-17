export default function Footer(props) {
  function irAlInicio(evento) {
    evento.preventDefault()
    props.onNavegar('/')
  }

  return (
    <footer className="pie-pagina text-center py-4 mt-5">
      <p className="mb-1">© 2026 Veterinaria San Marcos · Rancagua</p>
      <a href="/" onClick={irAlInicio}>Volver al inicio</a>
    </footer>
  )
}