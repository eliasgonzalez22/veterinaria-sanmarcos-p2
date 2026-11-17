import { useEffect, useState } from 'react'
import { Table, Alert, Spinner } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FilaCita from '../components/molecules/FilaCita'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { listarUsuarios } from '../services/usuarioService'
import { listarCitasDeUsuario } from '../services/citaService'
import { obtenerMensajeError } from '../utils/mensajesError'
import { nombreRol } from '../utils/roles'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
  useTituloPagina('Admin · Usuarios')

  // Al montar la página: GET /usuarios (solo ADMINISTRADOR).
  useEffect(() => {
    let vigente = true
    listarUsuarios()
      .then((lista) => { if (vigente) setUsuarios(lista) })
      .catch((e) => { if (vigente) setError(obtenerMensajeError(e)) })
      .finally(() => { if (vigente) setCargando(false) })
    return () => { vigente = false }
  }, [])

  // Las citas siguen en el navegador hasta que exista el microservicio de citas.
  const historial = seleccionado ? listarCitasDeUsuario(seleccionado.email) : []

  return (
    <PlantillaAdmin>
      <h1 className="h3 mb-3">Usuarios</h1>

      {cargando && (
        <p role="status"><Spinner animation="border" size="sm" className="me-2" />Cargando usuarios...</p>
      )}
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      {!cargando && !error && usuarios.length === 0 && (
        <Alert variant="info">Todavía no hay usuarios registrados.</Alert>
      )}

      {usuarios.length > 0 && (
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Citas</th>
              <th>Historial</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{nombreRol(u.rol)}</td>
                <td>{u.activo ? 'Activo' : 'Desactivado'}</td>
                <td>{listarCitasDeUsuario(u.email).length}</td>
                <td>
                  <Boton variante="outline-primary" onClick={() => setSeleccionado(u)}>
                    Ver historial
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {seleccionado && (
        <section aria-labelledby="titulo-historial" className="mt-4">
          <h2 id="titulo-historial" className="h5">Historial de {seleccionado.nombre}</h2>
          {historial.length === 0 ? (
            <Alert variant="info">Este usuario aún no tiene citas.</Alert>
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
                {historial.map((c) => (
                  <FilaCita key={c.id} cita={c} />
                ))}
              </tbody>
            </Table>
          )}
        </section>
      )}
    </PlantillaAdmin>
  )
}
