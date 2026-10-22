export function validarEmail(email) {
  if (!email) return 'El correo es obligatorio'
  const partes = email.split('@')
  if (partes.length !== 2 || partes[0] === '' || !partes[1].includes('.')) {
    return 'Ingresa un correo válido'
  }
  return ''
}

export function validarClave(clave) {
  if (!clave) return 'La contraseña es obligatoria'
  if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
  return ''
}

export function validarNombre(nombre) {
  if (!nombre.trim()) return 'El nombre es obligatorio'
  if (nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres'
  return ''
}

export function validarConfirmacion(clave, confirmacion) {
  if (!confirmacion) return 'Debes repetir la contraseña'
  if (clave !== confirmacion) return 'Las contraseñas no coinciden'
  return ''
}