import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerSesion } from '../services/usuarioService'
import { guardarSolicitudEnCurso } from '../services/citaService'

export default function Agendar() {
  const navigate = useNavigate()
  const params = useParams()
  const contexto = useServicios()
  const sesion = obtenerSesion()
  const servicio = contexto.servicios.find((s) => s.id === Number(params.id))

  useTituloPagina('Agendar cita')

  if (!sesion) {
    return (
      <PlantillaPublica>
        <Alert variant="warning">Para agendar una cita debes ingresar a tu cuenta.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </PlantillaPublica>
    )
  }

  if (!servicio) {
    return (
      <PlantillaPublica>
        <h1 className="h3">Servicio no encontrado</h1>
        <Boton onClick={() => navigate('/servicios')}>Ir a servicios</Boton>
      </PlantillaPublica>
    )
  }

  function continuar(datos) {
    guardarSolicitudEnCurso({
      servicioId: servicio.id,
      servicioNombre: servicio.nombre,
      precio: servicio.precio,
      mascota: datos.mascota,
      fecha: datos.fecha,
      hora: datos.hora,
      email: sesion.email,
      nombre: sesion.nombre,
    })
    navigate('/confirmacion')
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <FormularioSolicitudCita servicio={servicio} onEnviar={continuar} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}