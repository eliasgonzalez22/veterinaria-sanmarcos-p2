import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useSesion } from '../context/SesionContext'
import { crearLoginRequestDto } from '../dto/auth.dto'
import { obtenerMensajeError } from '../utils/mensajesError'
import { rutaInicioSegunRol } from '../utils/roles'

export default function Login() {
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const { ingresar, aviso } = useSesion()
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Ingresar')

  // El formulario ya validó en el navegador; aquí se llama a la API (que valida de nuevo).
  async function enviar(datos) {
    setCargando(true)
    setMensaje('')
    try {
      const usuario = await ingresar(crearLoginRequestDto(datos))
      // Si venía de una página protegida, vuelve a ella; si no, va al inicio de su rol.
      const desde = ubicacion.state && ubicacion.state.desde
      navigate(desde || rutaInicioSegunRol(usuario), { replace: true })
    } catch (error) {
      // 401: mensaje genérico, sin revelar si el correo existe.
      if (error.response && error.response.status === 401) {
        setMensaje('Correo o contraseña incorrectos')
      } else {
        setMensaje(obtenerMensajeError(error))
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          {aviso && <Alert variant="warning">{aviso}</Alert>}
          {mensaje && <Alert variant="danger" role="alert">{mensaje}</Alert>}
          <FormularioLogin onEnviar={enviar} cargando={cargando} />
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
