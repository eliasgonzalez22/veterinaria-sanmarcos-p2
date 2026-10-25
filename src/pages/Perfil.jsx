import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert, Form } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import CampoFormulario from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { validarNombre } from '../utils/validaciones'
import { obtenerSesion, actualizarUsuario } from '../services/usuarioService'

export default function Perfil() {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  const [nombre, setNombre] = useState(sesion ? sesion.nombre : '')
  const [error, setError] = useState('')
  const [guardado, setGuardado] = useState(false)
  useTituloPagina('Perfil')

  if (!sesion) {
    return (
      <PlantillaPublica>
        <Alert variant="warning">Ingresa a tu cuenta para ver tu perfil.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </PlantillaPublica>
    )
  }

  function guardar(evento) {
    evento.preventDefault()
    const mensaje = validarNombre(nombre)
    setError(mensaje)
    setGuardado(false)
    if (!mensaje) {
      actualizarUsuario(sesion.id, { nombre: nombre.trim() })
      setGuardado(true)
    }
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Form onSubmit={guardar} noValidate className="card card-body shadow-sm">
            <h1 className="h4 mb-3">Mi perfil</h1>
            <p className="mb-1">Correo: {sesion.email}</p>
            <p>Rol: {sesion.rol === 'recepcionista' ? 'Recepcionista' : 'Dueño'}</p>
            {guardado && <Alert variant="success">Perfil actualizado</Alert>}
            <CampoFormulario
              id="perfil-nombre"
              etiqueta="Nombre"
              valor={nombre}
              onCambio={setNombre}
              error={error}
            />
            <Boton tipo="submit">Guardar</Boton>
          </Form>
        </Col>
      </Row>
    </PlantillaPublica>
  )
}