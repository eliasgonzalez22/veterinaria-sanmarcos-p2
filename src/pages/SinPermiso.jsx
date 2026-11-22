import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function SinPermiso() {
  const navigate = useNavigate()
  useTituloPagina('Sin permiso')

  return (
    <PlantillaPublica>
      <h1 className="h3 mb-3">No tienes permiso para ver esta página</h1>
      <Alert variant="warning">Tu cuenta no tiene el rol necesario para esta sección.</Alert>
      <Boton onClick={() => navigate('/')}>Volver al inicio</Boton>
    </PlantillaPublica>
  )
}
