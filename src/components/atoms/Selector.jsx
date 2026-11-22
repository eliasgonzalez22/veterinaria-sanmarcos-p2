import { Form } from 'react-bootstrap'

// Átomo: lista desplegable. Las opciones pueden ser textos ('Consultas')
// u objetos con valor y texto distintos ({ valor: 'DUENO', texto: 'Dueño de mascota' }).
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
