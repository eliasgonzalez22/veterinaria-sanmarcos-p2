import { useNavigate, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import EtiquetaEspecie from '../components/atoms/EtiquetaEspecie'
import { servicios } from '../data/servicios'
import { formatearPrecio } from '../utils/precios'

export default function DetalleServicio() {
  const navigate = useNavigate()
  const params = useParams()

  const id = Number(params.id)
  const servicio = servicios.find((s) => s.id === id)

  if (!servicio) {
    return (
      <PlantillaPublica>
        <h1 className="h3">Servicio no encontrado</h1>
        <p>No existe un servicio con el código "{params.id}".</p>
        <Boton onClick={() => navigate('/servicios')}>Ir a servicios</Boton>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <article className="card shadow-sm">
        <div className="card-body">
          <p><EtiquetaEspecie especie={servicio.especie} /></p>
          <h1 className="h3">{servicio.nombre}</h1>
          <p className="mb-1">Categoría: {servicio.categoria}</p>
          <p className="mb-1">Duración: {servicio.duracion}</p>
          {servicio.obs && <p className="mb-1">Observaciones: {servicio.obs}</p>}
          <p className="fs-4 fw-bold mt-3">{formatearPrecio(servicio.precio)}</p>
          <Boton variante="outline-success" onClick={() => navigate(-1)}>Volver</Boton>
        </div>
      </article>
    </PlantillaPublica>
  )
}