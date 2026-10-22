import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Boton from '../atoms/Boton'
import { validarEmail, validarClave } from '../../utils/validaciones'

export default function FormularioLogin(props) {
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [errores, setErrores] = useState({ email: '', clave: '' })

  function enviar(evento) {
    evento.preventDefault()
    const nuevos = { email: validarEmail(email), clave: validarClave(clave) }
    setErrores(nuevos)
    if (!nuevos.email && !nuevos.clave) {
      props.onEnviar({ email: email })
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="card card-body shadow-sm">
      <h2 className="h4 mb-3">Ingresar</h2>
      <CampoFormulario
        id="login-email"
        etiqueta="Correo"
        tipo="email"
        valor={email}
        onCambio={setEmail}
        error={errores.email}
      />
      <CampoFormulario
        id="login-clave"
        etiqueta="Contraseña"
        tipo="password"
        valor={clave}
        onCambio={setClave}
        error={errores.clave}
      />
      <Boton tipo="submit">Ingresar</Boton>
    </Form>
  )
}