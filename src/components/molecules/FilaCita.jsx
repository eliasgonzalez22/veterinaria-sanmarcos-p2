import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'

export default function FilaCita(props) {
  const cita = props.cita

  return (
    <tr>
      <td>{cita.servicioNombre}</td>
      <td>{cita.mascota}</td>
      <td>{cita.fecha} {cita.hora}</td>
      <td>
        <EtiquetaEstadoCita estado={cita.estado} />
        {cita.propuesta && <div className="small mt-1">Propuesta: {cita.propuesta}</div>}
      </td>
      {props.children && <td>{props.children}</td>}
    </tr>
  )
}