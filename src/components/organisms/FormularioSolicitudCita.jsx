import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import SelectorFechaHora from '../molecules/SelectorFechaHora'
import Boton from '../atoms/Boton'
import { formatearPrecio } from '../../utils/precios'
import { fechaHoy, validarMascota, validarFecha, validarHora } from '../../utils/validaciones'

export default function FormularioSolicitudCita(props) {
  const servicio = props.servicio
  const [mascota, setMascota] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [errores, setErrores] = useState({ mascota: '', fecha: '', hora: '' })

  function enviar(evento) {
    evento.preventDefault()
    const nuevos = {
      mascota: validarMascota(mascota),
      fecha: validarFecha(fecha),
      hora: validarHora(hora),
    }
    setErrores(nuevos)
    if (!nuevos.mascota && !nuevos.fecha && !nuevos.hora) {
      props.onEnviar({ mascota: mascota.trim(), fecha: fecha, hora: hora })
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="card card-body shadow-sm">
      <h2 className="h4">Agendar: {servicio.nombre}</h2>
      <p className="text-muted">
        {servicio.duracion} · {formatearPrecio(servicio.precio)}
      </p>
      <CampoFormulario
        id="cita-mascota"
        etiqueta="Nombre de tu mascota"
        valor={mascota}
        onCambio={setMascota}
        error={errores.mascota}
      />
      <SelectorFechaHora
        minimo={fechaHoy()}
        fecha={fecha}
        hora={hora}
        onCambioFecha={setFecha}
        onCambioHora={setHora}
        errorFecha={errores.fecha}
        errorHora={errores.hora}
      />
      <Boton tipo="submit">Continuar</Boton>
    </Form>
  )
}