import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/precios'

export default function TarjetaServicio(props) {
  const servicio = props.servicio

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <p className="mb-2"><EtiquetaEspecie especie={servicio.especie} /></p>
        <h2 className="h5 card-title">{servicio.nombre}</h2>
        <p className="text-muted small mb-1">{servicio.categoria} · {servicio.duracion}</p>
        {servicio.obs && <p className="small fst-italic mb-2">{servicio.obs}</p>}
        <p className="fw-bold mt-auto mb-2">{formatearPrecio(servicio.precio)}</p>
        <Boton variante="outline-success" onClick={() => props.onVerDetalle(servicio.id)}>
          Ver detalle
        </Boton>
      </div>
    </article>
  )
}