// sesionService: guarda y lee la sesión del usuario en el navegador.
// Funciones de JavaScript puro (sin React), así se pueden probar solas.
//
// Decisión: sessionStorage (no localStorage).
// - Sobrevive a la recarga de la página (lo pide IE3.3.2).
// - Se borra sola al cerrar la pestaña, así el token no queda guardado días en el equipo.
// - Riesgo: un script malicioso inyectado en la página (XSS) podría leerlo. Lo reducimos
//   porque React escapa el texto que muestra, no usamos innerHTML y el token dura poco (60 min).
// - Alternativa más segura: cookie HttpOnly emitida por el backend (requiere protección CSRF).

const CLAVE = 'sesionVeterinaria'

function leer() {
  try {
    const guardado = sessionStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

// Recibe la respuesta del login: { token, tipo, expiraEnSegundos, usuario }
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
  // Limpia también la sesión simulada de la Parcial 2, si quedó en el navegador.
  localStorage.removeItem('sesion')
}

// Devuelve la sesión completa solo si el token sigue vigente. Si venció, la borra.
function sesionVigente() {
  const sesion = leer()
  if (!sesion || !sesion.token) return null
  if (Date.now() >= sesion.expiraEn) {
    limpiarSesion()
    return null
  }
  return sesion
}

// Datos públicos del usuario conectado: { id, nombre, email, rol, activo } o null.
export function obtenerSesion() {
  const sesion = sesionVigente()
  return sesion ? sesion.usuario : null
}

export function obtenerToken() {
  const sesion = sesionVigente()
  return sesion ? sesion.token : null
}

// Momento (en milisegundos) en que vence el token, o null si no hay sesión.
export function obtenerExpiracion() {
  const sesion = sesionVigente()
  return sesion ? sesion.expiraEn : null
}

// Reemplaza los datos del usuario (por ejemplo, después de editar el perfil) sin tocar el token.
export function actualizarUsuarioEnSesion(usuario) {
  const sesion = sesionVigente()
  if (!sesion) return null
  const nueva = { ...sesion, usuario: usuario }
  sessionStorage.setItem(CLAVE, JSON.stringify(nueva))
  return usuario
}
