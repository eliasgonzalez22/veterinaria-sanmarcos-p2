export default function Selector(props) {
  return (
    <select className="form-select" id={props.id} value={props.value} onChange={props.onChange}>
      {props.opciones.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}