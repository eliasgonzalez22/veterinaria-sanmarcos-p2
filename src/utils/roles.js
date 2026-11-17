// Roles del caso Veterinaria San Marcos, con los mismos nombres que usa el backend.
export const ROLES = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  RECEPCIONISTA: 'RECEPCIONISTA',
  DUENO: 'DUENO',
}

// Personal de la clínica: puede entrar al panel /admin.
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

// true si el usuario tiene alguno de los roles. Sin lista de roles, basta con haber iniciado sesión.
export function tieneRol(usuario, roles) {
  if (!usuario) return false
  if (!roles || roles.length === 0) return true
  return roles.includes(usuario.rol)
}

// Adónde va cada rol después de iniciar sesión.
export function rutaInicioSegunRol(usuario) {
  return esPersonal(usuario) ? '/admin' : '/mis-citas'
}
