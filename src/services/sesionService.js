
const CLAVE = 'sesionVeterinaria'

function leer() {
  try {
    const guardado = sessionStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

export function guardarSesion(respuestaLogin) {
  const sesion = {
    token: respuestaLogin.token,
    expiraEn: Date.now() + respuestaLogin.expiraEnSegundos * 1000,
    usuario: respuestaLogin.usuario,
  }
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion))
  return sesion
}

export function limpiarSesion() {
  sessionStorage.removeItem(CLAVE)
  localStorage.removeItem('sesion')
}

function sesionVigente() {
  const sesion = leer()
  if (!sesion || !sesion.token) return null
  if (Date.now() >= sesion.expiraEn) {
    limpiarSesion()
    return null
  }
  return sesion
}

export function obtenerSesion() {
  const sesion = sesionVigente()
  return sesion ? sesion.usuario : null
}

export function obtenerToken() {
  const sesion = sesionVigente()
  return sesion ? sesion.token : null
}

export function obtenerExpiracion() {
  const sesion = sesionVigente()
  return sesion ? sesion.expiraEn : null
}

export function actualizarUsuarioEnSesion(usuario) {
  const sesion = sesionVigente()
  if (!sesion) return null
  const nueva = { ...sesion, usuario: usuario }
  sessionStorage.setItem(CLAVE, JSON.stringify(nueva))
  return usuario
}
