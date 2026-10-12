import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios(props) {
  if (props.servicios.length === 0) {
    return <p className="alert alert-info" role="alert">No hay servicios que mostrar.</p>
  }

  return (
    <ul className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 list-unstyled">
      {props.servicios.map((s) => (
        <li className="col" key={s.id}>
          <TarjetaServicio servicio={s} onVerDetalle={props.onVerDetalle} />
        </li>
      ))}
    </ul>
  )
}