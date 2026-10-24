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

export function fechaHoy() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function validarMascota(nombre) {
  if (!nombre.trim()) return 'Ingresa el nombre de tu mascota'
  return ''
}

export function validarFecha(fecha) {
  if (!fecha) return 'Elige una fecha'
  if (fecha < fechaHoy()) return 'La fecha no puede ser anterior a hoy'
  return ''
}

export function validarHora(hora) {
  if (!hora) return 'Elige una hora'
  if (hora < '09:00' || hora > '18:00') return 'Atendemos entre 09:00 y 18:00'
  return ''
}

export function validarObligatorio(valor, nombreCampo) {
  if (!String(valor).trim()) return `${nombreCampo} es obligatorio`
  return ''
}

export function validarPrecio(precio) {
  if (precio === '') return 'El precio es obligatorio'
  if (isNaN(Number(precio)) || Number(precio) <= 0) return 'El precio debe ser un número mayor a 0'
  return ''
}