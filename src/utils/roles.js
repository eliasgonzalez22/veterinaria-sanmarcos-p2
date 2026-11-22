export const ROLES = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  RECEPCIONISTA: 'RECEPCIONISTA',
  DUENO: 'DUENO',
}

export const ROLES_PERSONAL = [ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA]

const NOMBRES = {
  ADMINISTRADOR: 'Administrador',
  RECEPCIONISTA: 'Recepcionista',
  DUENO: 'Dueño de mascota',
}

export function nombreRol(rol) {
  return NOMBRES[rol] || rol
}

export function esPersonal(usuario) {
  return Boolean(usuario) && ROLES_PERSONAL.includes(usuario.rol)
}

export function tieneRol(usuario, roles) {
  if (!usuario) return false
  if (!roles || roles.length === 0) return true
  return roles.includes(usuario.rol)
}

export function rutaInicioSegunRol(usuario) {
  return esPersonal(usuario) ? '/admin' : '/mis-citas'
}
