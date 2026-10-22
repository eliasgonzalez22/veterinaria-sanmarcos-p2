import { servicios as iniciales } from '../data/servicios'

const CLAVE = 'servicios'

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarServicios() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado) return JSON.parse(guardado)
  guardar(iniciales)
  return iniciales
}

export function obtenerServicio(id) {
  return listarServicios().find((s) => s.id === id) ?? null
}

export function crearServicio(datos) {
  const lista = listarServicios()
  const id = lista.length ? Math.max(...lista.map((s) => s.id)) + 1 : 1
  const nuevo = { ...datos, id: id }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarServicio(id, cambios) {
  const lista = listarServicios()
  const existe = lista.some((s) => s.id === id)
  if (!existe) return null
  const nueva = lista.map((s) => (s.id === id ? { ...s, ...cambios } : s))
  guardar(nueva)
  return nueva.find((s) => s.id === id)
}

export function eliminarServicio(id) {
  const lista = listarServicios()
  const nueva = lista.filter((s) => s.id !== id)
  guardar(nueva)
  return nueva.length !== lista.length
}