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