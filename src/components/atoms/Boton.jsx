export default function Boton(props) {
  return (
    <button
      type={props.tipo || 'button'}
      className={`btn btn-${props.variante || 'success'}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}