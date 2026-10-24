import { useNavigate, useLocation } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Resultado() {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const estado = ubicacion.state
  useTituloPagina('Resultado de la solicitud')

  if (estado && estado.ok) {
    return (
      <PlantillaPublica>
        <Alert variant="success">
          <h1 className="h4">¡Solicitud enviada!</h1>
          <p className="mb-0">
            Tu cita N° {estado.id} quedó pendiente. La recepción la confirmará o te propondrá otro horario.
          </p>
        </Alert>
        <div className="d-flex gap-2">
          <Boton onClick={() => navigate('/mis-citas')}>Ver mis citas</Boton>
          <Boton variante="outline-success" onClick={() => navigate('/')}>Ir al inicio</Boton>
        </div>
      </PlantillaPublica>
    )
  }

  return (
    <PlantillaPublica>
      <Alert variant="danger">
        <h1 className="h4">No pudimos registrar tu cita</h1>
        <p className="mb-0">Ocurrió un problema. Intenta nuevamente.</p>
      </Alert>
      <Boton onClick={() => navigate('/servicios')}>Volver a servicios</Boton>
    </PlantillaPublica>
  )
}