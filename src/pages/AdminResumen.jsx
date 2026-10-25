import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Table } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FilaCita from '../components/molecules/FilaCita'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { listarCitas } from '../services/citaService'
import { listarUsuarios } from '../services/usuarioService'

function Indicador(props) {
  return (
    <Card className="h-100 shadow-sm text-center">
      <Card.Body>
        <p className="display-6 fw-bold mb-0">{props.valor}</p>
        <p className="text-muted mb-0">{props.titulo}</p>
      </Card.Body>
    </Card>
  )
}

export default function AdminResumen() {
  const navigate = useNavigate()
  const contexto = useServicios()
  const citas = listarCitas()
  const usuarios = listarUsuarios()
  const pendientes = citas.filter((c) => c.estado === 'pendiente')
  const confirmadas = citas.filter((c) => c.estado === 'confirmada')
  useTituloPagina('Admin · Resumen')

  return (
    <PlantillaAdmin>
      <h1 className="h3 mb-3">Resumen</h1>
      <Row xs={2} lg={4} className="g-3 mb-4">
        <Col><Indicador titulo="Citas en total" valor={citas.length} /></Col>
        <Col><Indicador titulo="Pendientes" valor={pendientes.length} /></Col>
        <Col><Indicador titulo="Confirmadas" valor={confirmadas.length} /></Col>
        <Col><Indicador titulo="Servicios" valor={contexto.servicios.length} /></Col>
      </Row>
      <p>Usuarios registrados: <strong>{usuarios.length}</strong></p>

      <section aria-labelledby="titulo-criticas" className="mt-4">
        <h2 id="titulo-criticas" className="h5">Ítems críticos: citas pendientes de atender</h2>
        {pendientes.length === 0 ? (
          <p className="text-muted">No hay citas pendientes. 🎉</p>
        ) : (
          <>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Mascota</th>
                  <th>Fecha y hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((c) => (
                  <FilaCita key={c.id} cita={c} />
                ))}
              </tbody>
            </Table>
            <Boton onClick={() => navigate('/admin')}>Gestionar solicitudes</Boton>
          </>
        )}
      </section>
    </PlantillaAdmin>
  )
}