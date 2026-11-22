import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Selector from '../atoms/Selector'
import Boton from '../atoms/Boton'
import { validarNombre, validarEmail, validarClave } from '../../utils/validaciones'
import { ROLES, nombreRol } from '../../utils/roles'

const OPCIONES_ROL = Object.values(ROLES).map((r) => ({ valor: r, texto: nombreRol(r) }))

export default function FormularioUsuario(props) {
  const editando = Boolean(props.usuario)
  const [nombre, setNombre] = useState(editando ? props.usuario.nombre : '')
  const [email, setEmail] = useState(editando ? props.usuario.email : '')
  const [clave, setClave] = useState('')
  const [rol, setRol] = useState(editando ? props.usuario.rol : ROLES.DUENO)
  const [activo, setActivo] = useState(editando ? props.usuario.activo : true)
  const [errores, setErrores] = useState({})

  function enviar(evento) {
    evento.preventDefault()
    const nuevos = {
      nombre: validarNombre(nombre),
      email: validarEmail(email.trim()),
      clave: editando && clave === '' ? '' : validarClave(clave),
    }
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return
    props.onGuardar({ nombre, email, clave, rol, activo })
  }

  return (
    <Form onSubmit={enviar} noValidate aria-busy={Boolean(props.cargando)}>
      <CampoFormulario id="usuario-nombre" etiqueta="Nombre" valor={nombre} onCambio={setNombre} error={errores.nombre} />
      <CampoFormulario id="usuario-email" etiqueta="Correo" tipo="email" valor={email} onCambio={setEmail} error={errores.email} />
      <CampoFormulario
        id="usuario-clave"
        etiqueta={editando ? 'Nueva contraseña (opcional)' : 'Contraseña'}
        tipo="password"
        valor={clave}
        onCambio={setClave}
        error={errores.clave}
      />

      <Form.Group className="mb-3" controlId="usuario-rol">
        <Form.Label>Rol</Form.Label>
        <Selector
          id="usuario-rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          opciones={OPCIONES_ROL}
          disabled={props.esPropio}
        />
        {props.esPropio && <Form.Text>No puedes cambiar el rol de tu propia cuenta.</Form.Text>}
      </Form.Group>

      {editando && (
        <Form.Check
          type="switch"
          id="usuario-activo"
          className="mb-3"
          label={activo ? 'Cuenta activa' : 'Cuenta desactivada'}
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
          disabled={props.esPropio}
        />
      )}

      <div className="d-flex gap-2">
        <Boton tipo="submit" disabled={props.cargando}>
          {props.cargando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear usuario'}
        </Boton>
        <Boton variante="outline-secondary" onClick={props.onCancelar} disabled={props.cargando}>
          Cancelar
        </Boton>
      </div>
    </Form>
  )
}
