const CLAVE = 'usuarios'
const CLAVE_SESION = 'sesion'

const iniciales = [
  { id: 1, nombre: 'Ana Dueña', email: 'dueno@sanmarcos.cl', clave: '123456', rol: 'dueno' },
  { id: 2, nombre: 'Rita Recepción', email: 'recepcion@sanmarcos.cl', clave: '123456', rol: 'recepcionista' },
]

export function listarUsuarios() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado) return JSON.parse(guardado)
  localStorage.setItem(CLAVE, JSON.stringify(iniciales))
  return iniciales
}

export function registrarUsuario(datos) {
  const usuarios = listarUsuarios()
  if (usuarios.some((u) => u.email === datos.email)) return null
  const id = usuarios.length ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1
  const nuevo = { id: id, nombre: datos.nombre, email: datos.email, clave: datos.clave, rol: 'dueno' }
  localStorage.setItem(CLAVE, JSON.stringify([...usuarios, nuevo]))
  return nuevo
}

export function iniciarSesion(email, clave) {
  const usuario = listarUsuarios().find((u) => u.email === email && u.clave === clave)
  if (!usuario) return null
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
  return usuario
}

export function obtenerSesion() {
  const guardado = localStorage.getItem(CLAVE_SESION)
  return guardado ? JSON.parse(guardado) : null
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}