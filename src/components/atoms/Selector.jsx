export default function Selector({ id, opciones, ...props }) {
  return (
    <select id={id} className="form-select" {...props}>
      {opciones.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}