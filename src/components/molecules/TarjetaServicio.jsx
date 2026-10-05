import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/precios'

export default function TarjetaServicio({ servicio }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="mb-2"><EtiquetaEspecie especie={servicio.especie} /></div>
        <h5 className="card-title">{servicio.nombre}</h5>
        <p className="text-muted small mb-1">{servicio.categoria} · {servicio.duracion}</p>
        {servicio.obs && <p className="small fst-italic mb-2">{servicio.obs}</p>}
        <p className="fw-bold mt-auto mb-2">{formatearPrecio(servicio.precio)}</p>
        <Boton variante="outline-success">Ver detalle</Boton>
      </div>
    </div>
  )
}