import { Form } from 'react-bootstrap'
import CampoTexto from '../atoms/CampoTexto'

export default function CampoFormulario(props) {
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.etiqueta}</Form.Label>
      <CampoTexto
        type={props.tipo || 'text'}
        value={props.valor}
        onChange={(e) => props.onCambio(e.target.value)}
        isInvalid={!!props.error}
      />
      <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
    </Form.Group>
  )
}