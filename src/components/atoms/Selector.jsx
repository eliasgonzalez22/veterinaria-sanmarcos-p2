import { Form } from 'react-bootstrap'

export default function Selector(props) {
  return (
    <Form.Select id={props.id} value={props.value} onChange={props.onChange} disabled={props.disabled}>
      {props.opciones.map((o) => {
        const valor = typeof o === 'object' ? o.valor : o
        const texto = typeof o === 'object' ? o.texto : o
        return <option key={valor} value={valor}>{texto}</option>
      })}
    </Form.Select>
  )
}
