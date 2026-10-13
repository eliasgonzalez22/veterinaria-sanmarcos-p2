import { useNavigate, useParams } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaServicios from '../components/organisms/ListaServicios'
import { servicios } from '../data/servicios'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Servicios() {
  const navigate = useNavigate()
  const params = useParams()

  let visibles = servicios
  let titulo = 'Servicios'

  if (params.nombre) {
    visibles = servicios.filter((s) => s.categoria === params.nombre)
    titulo = params.nombre
  }
  if (params.texto) {
    const buscado = params.texto.toLowerCase()
    visibles = servicios.filter((s) => s.nombre.toLowerCase().includes(buscado))
    titulo = `Resultados para "${params.texto}"`
  }

  useTituloPagina(titulo)

  return (
    <PlantillaPublica>
      <h1 className="h3 mb-3">{titulo}</h1>
      <ListaServicios servicios={visibles} onVerDetalle={(id) => navigate(`/servicio/${id}`)} />
    </PlantillaPublica>
  )
}