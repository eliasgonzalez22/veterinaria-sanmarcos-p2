import { Row, Col, Form } from 'react-bootstrap'
import CampoTexto from '../atoms/CampoTexto'

export default function SelectorFechaHora(props) {
  return (
    <Row>
      <Col xs={12} sm={6}>
        <Form.Group className="mb-3" controlId="cita-fecha">
          <Form.Label>Fecha</Form.Label>
          <CampoTexto
            type="date"
            min={props.minimo}
            value={props.fecha}
            onChange={(e) => props.onCambioFecha(e.target.value)}
            isInvalid={!!props.errorFecha}
          />
          <Form.Control.Feedback type="invalid">{props.errorFecha}</Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col xs={12} sm={6}>
        <Form.Group className="mb-3" controlId="cita-hora">
          <Form.Label>Hora</Form.Label>
          <CampoTexto
            type="time"
            value={props.hora}
            onChange={(e) => props.onCambioHora(e.target.value)}
            isInvalid={!!props.errorHora}
          />
          <Form.Control.Feedback type="invalid">{props.errorHora}</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  )
}