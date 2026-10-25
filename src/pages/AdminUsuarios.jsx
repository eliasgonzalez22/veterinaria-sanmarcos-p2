import { useState } from 'react'
import { Table, Alert } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FilaCita from '../components/molecules/FilaCita'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { listarUsuarios } from '../services/usuarioService'
import { listarCitasDeUsuario } from '../services/citaService'

export default function AdminUsuarios() {
  const usuarios = listarUsuarios()
  const [seleccionado, setSeleccionado] = useState(null)
  useTituloPagina('Admin · Usuarios')

  const historial = seleccionado ? listarCitasDeUsuario(seleccionado.email) : []

  return (
    <PlantillaAdmin>
      <h1 className="h3 mb-3">Usuarios</h1>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Citas</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol === 'recepcionista' ? 'Recepcionista' : 'Dueño'}</td>
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