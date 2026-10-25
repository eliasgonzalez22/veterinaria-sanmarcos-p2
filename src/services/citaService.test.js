import {
  listarCitas,
  listarCitasDeUsuario,
  crearCita,
  cambiarEstadoCita,
  guardarSolicitudEnCurso,
  obtenerSolicitudEnCurso,
  limpiarSolicitudEnCurso,
} from './citaService'

const datos = { email: 'dueno@sanmarcos.cl', servicioNombre: 'Consulta general', mascota: 'Luna' }

describe('citaService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte sin citas', () => {
    expect(listarCitas()).toEqual([])
  })

  it('crea una cita pendiente con id 1', () => {
    const cita = crearCita(datos)
    expect(cita.id).toBe(1)
    expect(cita.estado).toBe('pendiente')
  })

  it('lista solo las citas de un usuario', () => {
    crearCita(datos)
    crearCita({ ...datos, email: 'otro@correo.cl' })
    expect(listarCitasDeUsuario('dueno@sanmarcos.cl')).toHaveLength(1)
  })

  it('confirma una cita', () => {
    const cita = crearCita(datos)
    expect(cambiarEstadoCita(cita.id, 'confirmada').estado).toBe('confirmada')
  })

  it('guarda la propuesta al reprogramar', () => {
    const cita = crearCita(datos)
    const cambiada = cambiarEstadoCita(cita.id, 'reprogramada', '2026-11-02 10:00')
    expect(cambiada.propuesta).toBe('2026-11-02 10:00')
  })

  it('devuelve null si la cita no existe', () => {
    expect(cambiarEstadoCita(99, 'confirmada')).toBeNull()
  })

  it('guarda y limpia la solicitud en curso', () => {
    guardarSolicitudEnCurso({ mascota: 'Luna' })
    expect(obtenerSolicitudEnCurso().mascota).toBe('Luna')
    limpiarSolicitudEnCurso()
    expect(obtenerSolicitudEnCurso()).toBeNull()
  })
})