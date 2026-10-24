import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Table } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatearPrecio } from '../utils/precios'

export default function AdminServicios() {
  const navigate = useNavigate()
  const contexto = useServicios()
  const [porEliminar, setPorEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  useTituloPagina('Admin · Servicios')

  function eliminar(id) {
    contexto.eliminar(id)
    setPorEliminar(null)
    setMensaje('Servicio eliminado')
  }

  return (
    <PlantillaAdmin>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Catálogo de servicios</h1>
        <Boton onClick={() => navigate('/admin/servicios/nuevo')}>Nuevo servicio</Boton>
      </div>
      {mensaje && <Alert variant="success" dismissible onClose={() => setMensaje('')}>{mensaje}</Alert>}
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contexto.servicios.map((s) => (
            <tr key={s.id}>
              <td>{s.codigo}</td>
              <td>{s.nombre}</td>
              <td>{s.categoria}</td>
              <td>{formatearPrecio(s.precio)}</td>
              <td>
                {porEliminar === s.id ? (
                  <div className="d-flex gap-2 align-items-center">
                    <span>¿Eliminar?</span>
                    <Boton variante="danger" onClick={() => eliminar(s.id)}>Sí</Boton>
                    <Boton variante="outline-secondary" onClick={() => setPorEliminar(null)}>No</Boton>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <Boton variante="outline-primary" onClick={() => navigate(`/admin/servicios/${s.id}/editar`)}>
                      Editar
                    </Boton>
                    <Boton variante="outline-danger" onClick={() => setPorEliminar(s.id)}>
                      Eliminar
                    </Boton>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PlantillaAdmin>
  )
}