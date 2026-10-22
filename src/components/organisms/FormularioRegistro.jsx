import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import {
  validarNombre,
  validarEmail,
  validarClave,
  validarConfirmacion,
} from '../../utils/validaciones'

export default function FormularioRegistro(props) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [errores, setErrores] = useState({ nombre: '', email: '', clave: '', confirmacion: '' })

  function enviar(evento) {
    evento.preventDefault()
    const nuevos = {
      nombre: validarNombre(nombre),
      email: validarEmail(email),
      clave: validarClave(clave),
      confirmacion: validarConfirmacion(clave, confirmacion),
    }
    setErrores(nuevos)
    if (!nuevos.nombre && !nuevos.email && !nuevos.clave && !nuevos.confirmacion) {
      props.onEnviar({ nombre: nombre.trim(), email: email, clave: clave })
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="card card-body shadow-sm">
      <h2 className="h4 mb-3">Crear cuenta</h2>
      <CampoFormulario id="reg-nombre" etiqueta="Nombre" valor={nombre} onCambio={setNombre} error={errores.nombre} />
      <CampoFormulario id="reg-email" etiqueta="Correo" tipo="email" valor={email} onCambio={setEmail} error={errores.email} />
      <CampoFormulario id="reg-clave" etiqueta="Contraseña" tipo="password" valor={clave} onCambio={setClave} error={errores.clave} />
      <CampoFormulario id="reg-confirmacion" etiqueta="Repetir contraseña" tipo="password" valor={confirmacion} onCambio={setConfirmacion} error={errores.confirmacion} />
      <Boton tipo="submit">Registrarme</Boton>
    </Form>
  )
}