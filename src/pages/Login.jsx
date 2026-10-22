import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useState } from 'react'
import { iniciarSesion } from '../services/usuarioService'

export default function Login() {
  const navigate = useNavigate()
  const [mensaje, setMensaje] = useState('')
  useTituloPagina('Ingresar')

  function ingresar(datos) {
    const usuario = iniciarSesion(datos.email, datos.clave)
    if (!usuario) {
      setMensaje('Correo o contraseña incorrectos')
      return
    }
    navigate(usuario.rol === 'recepcionista' ? '/admin' : '/mis-citas')
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          {mensaje && <Alert variant="danger">{mensaje}</Alert>}
          <FormularioLogin onEnviar={ingresar} />
          <p className="mt-3 text-center">
            ¿No tienes cuenta?{' '}
            <a href="/registro" onClick={(e) => { e.preventDefault(); navigate('/registro') }}>
              Regístrate
            </a>
          </p>
        </Col>
      </Row>
    </PlantillaPublica>
  )
}