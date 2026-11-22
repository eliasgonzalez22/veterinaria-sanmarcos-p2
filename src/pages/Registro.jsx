import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Alert } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useSesion } from '../context/SesionContext'
import { crearRegistroRequestDto, crearLoginRequestDto } from '../dto/auth.dto'
import { obtenerMensajeError } from '../utils/mensajesError'

export default function Registro() {
  const navigate = useNavigate()
  const { registrar, ingresar } = useSesion()
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Crear cuenta')

  async function enviar(datos) {
    setCargando(true)
    setMensaje('')
    try {
      await registrar(crearRegistroRequestDto(datos))
      await ingresar(crearLoginRequestDto(datos))
      navigate('/mis-citas', { replace: true })
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMensaje('Ya existe una cuenta con ese correo')
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
          {mensaje && <Alert variant="danger" role="alert">{mensaje}</Alert>}
          <FormularioRegistro onEnviar={enviar} cargando={cargando} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}
