import { useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FilaCita from '../components/molecules/FilaCita'
import CampoTexto from '../components/atoms/CampoTexto'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { listarCitas, cambiarEstadoCita } from '../services/citaService'

export default function Admin() {
  const [citas, setCitas] = useState(listarCitas())
  const [editando, setEditando] = useState(null)
  const [propuesta, setPropuesta] = useState('')
  useTituloPagina('Admin · Citas')

  function confirmar(id) {
    cambiarEstadoCita(id, 'confirmada')
    setCitas(listarCitas())
  }

  function enviarPropuesta(id) {
    if (!propuesta) return
    cambiarEstadoCita(id, 'reprogramada', propuesta.replace('T', ' '))
    setEditando(null)
    setPropuesta('')
    setCitas(listarCitas())
  }

  return (
    <PlantillaAdmin>
      <h1 className="h3 mb-3">Solicitudes de cita</h1>
      {citas.length === 0 ? (
        <Alert variant="info">Todavía no hay solicitudes.</Alert>
      ) : (
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Mascota</th>
              <th>Fecha y hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <FilaCita key={c.id} cita={c}>
                <div className="d-flex flex-column gap-2">
                  <Boton variante="success" onClick={() => confirmar(c.id)}>Confirmar</Boton>
                  <Boton variante="outline-primary" onClick={() => setEditando(c.id)}>
                    Proponer otro horario
                  </Boton>
                  {editando === c.id && (
                    <div className="d-flex gap-2">
                      <CampoTexto
                        type="datetime-local"
                        aria-label="Nuevo horario"
                        value={propuesta}
                        onChange={(e) => setPropuesta(e.target.value)}
                      />
                      <Boton onClick={() => enviarPropuesta(c.id)}>Enviar</Boton>
                    </div>
                  )}
                </div>
              </FilaCita>
            ))}
          </tbody>
        </Table>
      )}
    </PlantillaAdmin>
  )
}