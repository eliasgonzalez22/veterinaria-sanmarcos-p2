import { obtenerMensajeError, obtenerErroresDeCampos } from './mensajesError'

describe('obtenerMensajeError', () => {
  it('caso 1: usa el mensaje que envía el backend', () => {
    const error = { response: { status: 409, data: { mensaje: 'El correo ya esta registrado' } } }
    expect(obtenerMensajeError(error)).toBe('El correo ya esta registrado')
  })

  it('caso 1 (400): agrega el detalle de cada campo', () => {
    const error = {
      response: {
        status: 400,
        data: { mensaje: 'Datos de entrada invalidos', errores: { email: 'El correo no es valido' } },
      },
    }
    expect(obtenerMensajeError(error)).toBe('Datos de entrada invalidos: El correo no es valido.')
    expect(obtenerErroresDeCampos(error)).toEqual({ email: 'El correo no es valido' })
  })

  it('caso 1 (403): mensaje de falta de permisos', () => {
    const error = { response: { status: 403, data: {} } }
    expect(obtenerMensajeError(error)).toBe('No tienes permiso para realizar esta acción.')
  })

  it('caso 2: tiempo de espera agotado', () => {
    expect(obtenerMensajeError({ code: 'ECONNABORTED' })).toContain('tardó demasiado')
  })

  it('caso 3: sin respuesta (backend apagado o CORS)', () => {
    expect(obtenerMensajeError(new Error('Network Error'))).toContain('No fue posible contactar la API')
  })
})
