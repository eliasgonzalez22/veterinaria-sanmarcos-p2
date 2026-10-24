import { useState } from 'react'
import { Alert, Modal, Table } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FilaCita from '../components/molecules/FilaCita'
import CampoTexto from '../components/atoms/CampoTexto'
import Boton from '../components/atoms/Boton'
import EtiquetaEstadoCita from '../components/atoms/EtiquetaEstadoCita'
import { formatearPrecio } from '../utils/precios'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { listarCitas, cambiarEstadoCita } from '../services/citaService'

export default function Admin() {
  const [citas, setCitas] = useState(listarCitas())
  const [editando, setEditando] = useState(null)
  const [propuesta, setPropuesta] = useState('')
  const [citaSeleccionada, setCitaSeleccionada] = useState(null)
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
                  <Boton variante="outline-secondary" onClick={() => setCitaSeleccionada(c)}>
                    Ver ficha
                  </Boton>
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

      <Modal show={Boolean(citaSeleccionada)} onHide={() => setCitaSeleccionada(null)} centered>
        {citaSeleccionada && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Ficha de solicitud #{citaSeleccionada.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-muted">Comprobante de solicitud de cita; no corresponde a un pago en línea.</p>
              <dl className="row mb-0">
                <dt className="col-sm-4">Cliente</dt>
                <dd className="col-sm-8">{citaSeleccionada.nombre || 'No informado'}</dd>
                <dt className="col-sm-4">Correo</dt>
                <dd className="col-sm-8">{citaSeleccionada.email || 'No informado'}</dd>
                <dt className="col-sm-4">Mascota</dt>
                <dd className="col-sm-8">{citaSeleccionada.mascota || 'No informada'}</dd>
                <dt className="col-sm-4">Servicio</dt>
                <dd className="col-sm-8">{citaSeleccionada.servicioNombre || 'No informado'}</dd>
                <dt className="col-sm-4">Fecha solicitada</dt>
                <dd className="col-sm-8">{citaSeleccionada.fecha || 'No informada'} · {citaSeleccionada.hora || 'Sin hora'}</dd>
                <dt className="col-sm-4">Valor</dt>
                <dd className="col-sm-8">{formatearPrecio(citaSeleccionada.precio || 0)}</dd>
                <dt className="col-sm-4">Estado</dt>
                <dd className="col-sm-8"><EtiquetaEstadoCita estado={citaSeleccionada.estado} /></dd>
              </dl>
              {citaSeleccionada.propuesta && (
                <p className="mt-3 mb-0"><strong>Horario propuesto:</strong> {citaSeleccionada.propuesta}</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Boton variante="outline-secondary" onClick={() => setCitaSeleccionada(null)}>Cerrar</Boton>
              <Boton onClick={() => window.print()}>Imprimir ficha</Boton>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </PlantillaAdmin>
  )
}