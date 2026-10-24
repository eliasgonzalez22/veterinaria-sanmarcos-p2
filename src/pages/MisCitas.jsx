import { useNavigate } from 'react-router-dom'
import { Alert, Table } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FilaCita from '../components/molecules/FilaCita'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerSesion } from '../services/usuarioService'
import { listarCitasDeUsuario } from '../services/citaService'

export default function MisCitas() {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  useTituloPagina('Mis citas')

  if (!sesion) {
    return (
      <PlantillaPublica>
        <Alert variant="warning">Ingresa a tu cuenta para ver tus citas.</Alert>
        <Boton onClick={() => navigate('/login')}>Ingresar</Boton>
      </PlantillaPublica>
    )
  }

  const citas = listarCitasDeUsuario(sesion.email)

  return (
    <PlantillaPublica>
      <h1 className="h3 mb-3">Mis citas</h1>
      {citas.length === 0 ? (
        <Alert variant="info">Aún no tienes citas. Elige un servicio para agendar.</Alert>
      ) : (
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Mascota</th>
              <th>Fecha y hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <FilaCita key={c.id} cita={c} />
            ))}
          </tbody>
        </Table>
      )}
    </PlantillaPublica>
  )
}