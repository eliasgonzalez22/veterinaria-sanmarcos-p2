import { Alert, Row, Col } from 'react-bootstrap'
import TarjetaServicio from '../molecules/TarjetaServicio'

export default function ListaServicios(props) {
  if (props.servicios.length === 0) {
    return <Alert variant="info">No hay servicios que mostrar.</Alert>
  }

  return (
    <Row as="ul" xs={1} md={2} xl={3} className="g-3 list-unstyled">
      {props.servicios.map((s) => (
        <Col as="li" key={s.id}>
          <TarjetaServicio servicio={s} onVerDetalle={props.onVerDetalle} />
        </Col>
      ))}
    </Row>
  )
}