import { createContext, useContext, useState } from 'react'
import {
  listarServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from '../services/servicioService'

const ServiciosContext = createContext(null)

export function ServiciosProvider(props) {
  const [servicios, setServicios] = useState(listarServicios())

  function recargar() {
    setServicios(listarServicios())
  }

  function crear(datos) {
    const nuevo = crearServicio(datos)
    recargar()
    return nuevo
  }

  function actualizar(id, cambios) {
    const actualizado = actualizarServicio(id, cambios)
    recargar()
    return actualizado
  }

  function eliminar(id) {
    const resultado = eliminarServicio(id)
    recargar()
    return resultado
  }

  const valor = {
    servicios: servicios,
    crear: crear,
    actualizar: actualizar,
    eliminar: eliminar,
    recargar: recargar,
  }

  return <ServiciosContext.Provider value={valor}>{props.children}</ServiciosContext.Provider>
}

export function useServicios() {
  const contexto = useContext(ServiciosContext)
  if (contexto === null) {
    throw new Error('useServicios debe usarse dentro de ServiciosProvider')
  }
  return contexto
}