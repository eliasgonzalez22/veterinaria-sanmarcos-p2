import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { registrarUsuario, iniciarSesion } from '../services/usuarioService'

export default function Registro() {
  const navigate = useNavigate()
  const [mensaje, setMensaje] = useState('')
  useTituloPagina('Crear cuenta')

  function registrar(datos) {
    const nuevo = registrarUsuario(datos)
    if (!nuevo) {
      setMensaje('Ya existe una cuenta con ese correo')
      return
    }
    iniciarSesion(datos.email, datos.clave)
    navigate('/mis-citas')
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          {mensaje && <Alert variant="danger">{mensaje}</Alert>}
          <FormularioRegistro onEnviar={registrar} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}