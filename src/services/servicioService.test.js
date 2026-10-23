import {
  listarUsuarios,
  registrarUsuario,
  iniciarSesion,
  obtenerSesion,
  cerrarSesion,
} from './usuarioService'

describe('usuarioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte con 2 usuarios iniciales', () => {
    expect(listarUsuarios()).toHaveLength(2)
  })

  it('inicia sesión con credenciales correctas', () => {
    const usuario = iniciarSesion('dueno@sanmarcos.cl', '123456')
    expect(usuario.rol).toBe('dueno')
    expect(obtenerSesion().email).toBe('dueno@sanmarcos.cl')
  })

  it('devuelve null con clave incorrecta', () => {
    expect(iniciarSesion('dueno@sanmarcos.cl', '000000')).toBeNull()
  })

  it('no registra un correo repetido', () => {
    const datos = { nombre: 'Ana', email: 'dueno@sanmarcos.cl', clave: '123456' }
    expect(registrarUsuario(datos)).toBeNull()
  })

  it('registra un usuario nuevo como dueño', () => {
    const nuevo = registrarUsuario({ nombre: 'Luis', email: 'luis@correo.cl', clave: '123456' })
    expect(nuevo.id).toBe(3)
    expect(nuevo.rol).toBe('dueno')
  })

  it('cierra la sesión', () => {
    iniciarSesion('dueno@sanmarcos.cl', '123456')
    cerrarSesion()
    expect(obtenerSesion()).toBeNull()
  })
})