import { Form } from 'react-bootstrap'

export default function Selector(props) {
  return (
    <Form.Select id={props.id} value={props.value} onChange={props.onChange}>
      {props.opciones.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </Form.Select>
  )
}