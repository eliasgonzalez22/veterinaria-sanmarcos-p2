import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatearPrecio } from '../utils/precios'
import {
  obtenerSolicitudEnCurso,
  limpiarSolicitudEnCurso,
  crearCita,
} from '../services/citaService'

export default function Confirmacion() {
  const navigate = useNavigate()
  const solicitud = obtenerSolicitudEnCurso()
  useTituloPagina('Confirmar cita')

  if (!solicitud) {
    return (
      <PlantillaPublica>
        <Alert variant="info">No tienes ninguna solicitud de cita en curso.</Alert>
        <Boton onClick={() => navigate('/servicios')}>Ver servicios</Boton>
      </PlantillaPublica>
    )
  }

  function confirmar() {
    try {
      const cita = crearCita(solicitud)
      limpiarSolicitudEnCurso()
      navigate('/resultado', { state: { ok: true, id: cita.id } })
    } catch (error) {
      navigate('/resultado', { state: { ok: false } })
    }
  }

  function cancelar() {
    limpiarSolicitudEnCurso()
    navigate('/servicios')
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <article className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4">Confirma tu cita</h1>
              <h2 className="h6 mt-3">Tus datos</h2>
              <p className="mb-1">Nombre: {solicitud.nombre}</p>
              <p className="mb-1">Correo: {solicitud.email}</p>
              <h2 className="h6 mt-3">Tu cita</h2>
              <p className="mb-1">Servicio: {solicitud.servicioNombre}</p>
              <p className="mb-1">Mascota: {solicitud.mascota}</p>
              <p className="mb-1">Fecha y hora: {solicitud.fecha} a las {solicitud.hora}</p>
              <p className="fw-bold mt-2">Valor: {formatearPrecio(solicitud.precio)}</p>
              <div className="d-flex gap-2">
                <Boton onClick={confirmar}>Confirmar cita</Boton>
                <Boton variante="outline-secondary" onClick={cancelar}>Cancelar</Boton>
              </div>
            </div>
          </article>
        </Col>
      </Row>
    </PlantillaPublica>
  )
}