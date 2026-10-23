import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from './servicioService'

describe('servicioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista los 31 servicios iniciales', () => {
    expect(listarServicios()).toHaveLength(31)
  })

  it('obtiene un servicio por id', () => {
    expect(obtenerServicio(1).codigo).toBe('SV001')
  })

  it('devuelve null si el servicio no existe', () => {
    expect(obtenerServicio(999)).toBeNull()
  })

  it('crea un servicio con id siguiente', () => {
    const nuevo = crearServicio({ nombre: 'Baño medicado', precio: 12000 })
    expect(nuevo.id).toBe(32)
    expect(listarServicios()).toHaveLength(32)
  })

  it('actualiza solo los campos indicados', () => {
    const actualizado = actualizarServicio(1, { precio: 99999 })
    expect(actualizado.precio).toBe(99999)
    expect(actualizado.codigo).toBe('SV001')
  })

  it('elimina un servicio', () => {
    expect(eliminarServicio(1)).toBe(true)
    expect(obtenerServicio(1)).toBeNull()
  })
})