import { Badge } from 'react-bootstrap'

export default function EtiquetaEspecie(props) {
  return <Badge bg="info" text="dark">{props.especie}</Badge>
}