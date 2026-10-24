import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioServicio from '../components/organisms/FormularioServicio'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function AdminServicioForm() {
  const navigate = useNavigate()
  const params = useParams()
  const contexto = useServicios()
  const categorias = [...new Set(contexto.servicios.map((s) => s.categoria))]
  const editando = params.id !== undefined
  const servicio = editando ? contexto.servicios.find((s) => s.id === Number(params.id)) : null

  useTituloPagina(editando ? 'Admin · Editar servicio' : 'Admin · Nuevo servicio')

  if (editando && !servicio) {
    return (
      <PlantillaAdmin>
        <Alert variant="danger">El servicio no existe.</Alert>
        <Boton onClick={() => navigate('/admin/servicios')}>Volver</Boton>
      </PlantillaAdmin>
    )
  }

  function guardar(datos) {
    if (editando) {
      contexto.actualizar(servicio.id, datos)
    } else {
      contexto.crear(datos)
    }
    navigate('/admin/servicios')
  }

  return (
    <PlantillaAdmin>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <FormularioServicio
            inicial={servicio}
            categorias={categorias}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/servicios')}
          />
        </Col>
      </Row>
    </PlantillaAdmin>
  )
}