import { Card } from 'react-bootstrap'
import EtiquetaEspecie from '../atoms/EtiquetaEspecie'
import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/precios'

export default function TarjetaServicio(props) {
  const servicio = props.servicio

  return (
    <Card as="article" className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <p className="mb-2"><EtiquetaEspecie especie={servicio.especie} /></p>
        <Card.Title as="h2" className="h5">{servicio.nombre}</Card.Title>
        <p className="text-muted small mb-1">{servicio.categoria} · {servicio.duracion}</p>
        {servicio.obs && <p className="small fst-italic mb-2">{servicio.obs}</p>}
        <p className="fw-bold mt-auto mb-2">{formatearPrecio(servicio.precio)}</p>
        <Boton variante="outline-success" onClick={() => props.onVerDetalle(servicio.id)}>
          Ver detalle
        </Boton>
      </Card.Body>
    </Card>
  )
}