export default function Icono(props) {
  if (props.etiqueta) {
    return <span role="img" aria-label={props.etiqueta}>{props.simbolo}</span>
  }
  return <span aria-hidden="true">{props.simbolo}</span>
}