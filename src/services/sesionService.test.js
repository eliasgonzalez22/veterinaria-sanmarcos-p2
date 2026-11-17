import { guardarSesion, obtenerSesion, obtenerToken, limpiarSesion, actualizarUsuarioEnSesion } from './sesionService'

const usuario = { id: 1, nombre: 'Administrador', email: 'admin@sanmarcos.cl', rol: 'ADMINISTRADOR' }

describe('sesionService', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('sin sesión guardada devuelve null', () => {
    expect(obtenerSesion()).toBeNull()
    expect(obtenerToken()).toBeNull()
  })

  it('guarda la sesión en sessionStorage, así sobrevive a una recarga', () => {
    guardarSesion({ token: 'abc', expiraEnSegundos: 3600, usuario: usuario })

    expect(sessionStorage.getItem('sesionVeterinaria')).not.toBeNull()
    expect(obtenerToken()).toBe('abc')
    expect(obtenerSesion().rol).toBe('ADMINISTRADOR')
  })

  it('cuando el token vence, la sesión se borra sola', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-20T10:00:00'))
    guardarSesion({ token: 'abc', expiraEnSegundos: 60, usuario: usuario })

    vi.setSystemTime(new Date('2026-11-20T10:01:01'))

    expect(obtenerSesion()).toBeNull()
    expect(sessionStorage.getItem('sesionVeterinaria')).toBeNull()
  })

  it('actualizarUsuarioEnSesion cambia los datos sin tocar el token', () => {
    guardarSesion({ token: 'abc', expiraEnSegundos: 3600, usuario: usuario })

    actualizarUsuarioEnSesion({ ...usuario, nombre: 'Nuevo nombre' })

    expect(obtenerSesion().nombre).toBe('Nuevo nombre')
    expect(obtenerToken()).toBe('abc')
  })

  it('limpiarSesion borra la sesión', () => {
    guardarSesion({ token: 'abc', expiraEnSegundos: 3600, usuario: usuario })
    limpiarSesion()
    expect(obtenerSesion()).toBeNull()
  })
})
