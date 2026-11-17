// Convierte un error de Axios en un mensaje claro para mostrar en la página (sin alert()).
// Distingue los tres casos de la guía 20, sección 5.
export function obtenerMensajeError(error) {
  // Caso 1: el servidor respondió, pero con un estado de error (400, 401, 403, 404, 409...).
  if (error && error.response) {
    const estado = error.response.status
    const datos = error.response.data

    if (estado === 403) return 'No tienes permiso para realizar esta acción.'

    if (datos && typeof datos.mensaje === 'string') {
      // 400: el backend trae el detalle por campo en "errores".
      if (datos.errores && typeof datos.errores === 'object') {
        return `${datos.mensaje}: ${Object.values(datos.errores).join('. ')}.`
      }
      return datos.mensaje
    }
    return `La API respondió con un error (${estado}).`
  }

  // Caso 2: se agotó el tiempo de espera (opción timeout de la instancia).
  if (error && error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta nuevamente.'
  }

  // Caso 3: no hubo respuesta (backend apagado, red caída o CORS).
  return 'No fue posible contactar la API. Revisa que el backend esté encendido, su dirección y CORS.'
}

// Errores por campo de un 400 (por ejemplo { email: 'El correo no es valido' }), o {} si no hay.
export function obtenerErroresDeCampos(error) {
  const datos = error && error.response && error.response.data
  return datos && datos.errores ? datos.errores : {}
}
