import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Login() {
  const navigate = useNavigate()
  useTituloPagina('Ingresar')

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <FormularioLogin onEnviar={() => navigate('/servicios')} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}