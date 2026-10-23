import { useNavigate, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import EtiquetaEspecie from '../components/atoms/EtiquetaEspecie'
import { useServicios } from '../context/ServiciosContext'
import { formatearPrecio } from '../utils/precios'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function DetalleServicio() {
  const navigate = useNavigate()
  const params = useParams()
  const contexto = useServicios()
  const id = Number(params.id)
  const servicio = contexto.servicios.find((s) => s.id === id)

  useTituloPagina(servicio ? servicio.nombre : 'Servicio no encontrado')
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