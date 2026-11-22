import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert, Form } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import CampoFormulario from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { validarNombre } from '../utils/validaciones'
import { useSesion } from '../context/SesionContext'
import { actualizarUsuario } from '../services/usuarioService'
import { obtenerMensajeError } from '../utils/mensajesError'
import { nombreRol } from '../utils/roles'

export default function Perfil() {
  const navigate = useNavigate()
  const { sesion, actualizarSesion } = useSesion()
  const [nombre, setNombre] = useState(sesion ? sesion.nombre : '')
  const [error, setError] = useState('')
  const [mensajeApi, setMensajeApi] = useState('')
  const [guardado, setGuardado] = useState(false)
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Perfil')

  if (!sesion) {
    return (
      <PlantillaPublica>
        <Alert variant="warning">Ingresa a tu cuenta para ver tu perfil.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </PlantillaPublica>
    )
  }

  async function guardar(evento) {
    evento.preventDefault()
    const mensaje = validarNombre(nombre)
    setError(mensaje)
    setGuardado(false)
    setMensajeApi('')
    if (mensaje) return

    setCargando(true)
    try {
      const actualizado = await actualizarUsuario(sesion.id, { nombre: nombre.trim() })
      actualizarSesion(actualizado)
      setGuardado(true)
    } catch (e) {
      setMensajeApi(obtenerMensajeError(e))
    } finally {
      setCargando(false)
    }
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Form onSubmit={guardar} noValidate className="card card-body shadow-sm" aria-busy={cargando}>
            <h1 className="h4 mb-3">Mi perfil</h1>
            <p className="mb-1">Correo: {sesion.email}</p>
            <p>Rol: {nombreRol(sesion.rol)}</p>
            {guardado && <Alert variant="success">Perfil actualizado</Alert>}
            {mensajeApi && <Alert variant="danger" role="alert">{mensajeApi}</Alert>}
            <CampoFormulario
              id="perfil-nombre"
              etiqueta="Nombre"
              valor={nombre}
              onCambio={setNombre}
              error={error}
            />
            <Boton tipo="submit" disabled={cargando}>{cargando ? 'Guardando...' : 'Guardar'}</Boton>
          </Form>
        </Col>
      </Row>
    </PlantillaPublica>
  )
}
