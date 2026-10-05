import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios({ servicios }) {
  if (servicios.length === 0) {
    return <div className="alert alert-info">No hay servicios que coincidan con la búsqueda.</div>
  }
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
      {servicios.map((s) => (
        <div className="col" key={s.id}>
          <TarjetaServicio servicio={s} />
        </div>
      ))}
    </div>
  )
}