export function obtenerMensajeError(error) {
  if (error && error.response) {
    const estado = error.response.status
    const datos = error.response.data

    if (estado === 403) return 'No tienes permiso para realizar esta acción.'

    if (datos && typeof datos.mensaje === 'string') {
      if (datos.errores && typeof datos.errores === 'object') {
        return `${datos.mensaje}: ${Object.values(datos.errores).join('. ')}.`
      }
      return datos.mensaje
    }
    return `La API respondió con un error (${estado}).`
  }

  if (error && error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta nuevamente.'
  }

  return 'No fue posible contactar la API. Revisa que el backend esté encendido, su dirección y CORS.'
}

export function obtenerErroresDeCampos(error) {
  const datos = error && error.response && error.response.data
  return datos && datos.errores ? datos.errores : {}
}
