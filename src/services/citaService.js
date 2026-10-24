const CLAVE = 'citas'
const CLAVE_EN_CURSO = 'solicitudEnCurso'

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarCitas() {
  const guardado = localStorage.getItem(CLAVE)
  return guardado ? JSON.parse(guardado) : []
}

export function listarCitasDeUsuario(email) {
  return listarCitas().filter((c) => c.email === email)
}

export function crearCita(datos) {
  const lista = listarCitas()
  const id = lista.length ? Math.max(...lista.map((c) => c.id)) + 1 : 1
  const nueva = { ...datos, id: id, estado: 'pendiente' }
  guardar([...lista, nueva])
  return nueva
}

export function cambiarEstadoCita(id, estado, propuesta) {
  const lista = listarCitas()
  if (!lista.some((c) => c.id === id)) return null
  const nueva = lista.map((c) =>
    c.id === id ? { ...c, estado: estado, propuesta: propuesta || '' } : c
  )
  guardar(nueva)
  return nueva.find((c) => c.id === id)
}

export function guardarSolicitudEnCurso(datos) {
  localStorage.setItem(CLAVE_EN_CURSO, JSON.stringify(datos))
}

export function obtenerSolicitudEnCurso() {
  const guardado = localStorage.getItem(CLAVE_EN_CURSO)
  return guardado ? JSON.parse(guardado) : null
}

export function limpiarSolicitudEnCurso() {
  localStorage.removeItem(CLAVE_EN_CURSO)
}