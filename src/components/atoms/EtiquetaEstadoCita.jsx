import { Badge } from 'react-bootstrap'
import Icono from './Icono'

const estados = {
  pendiente: { color: 'warning', texto: 'Pendiente', simbolo: '⏳' },
  confirmada: { color: 'success', texto: 'Confirmada', simbolo: '✅' },
  reprogramada: { color: 'info', texto: 'Otro horario propuesto', simbolo: '🔄' },
}

export default function EtiquetaEstadoCita(props) {
  const estado = estados[props.estado] || estados.pendiente

  return (
    <Badge bg={estado.color} text={estado.color === 'success' ? 'white' : 'dark'}>
      <Icono simbolo={estado.simbolo} /> {estado.texto}
    </Badge>
  )
}