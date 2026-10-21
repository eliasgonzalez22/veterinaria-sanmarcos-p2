import { Button } from 'react-bootstrap'

export default function Boton(props) {
  return (
    <Button
      type={props.tipo || 'button'}
      variant={props.variante || 'success'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  )
}