vi.mock('./api', () => ({
  api: { post: vi.fn(), get: vi.fn() },
}))

import { api } from './api'
import { iniciarSesion, registrarUsuario, cerrarSesion } from './authService'
import { obtenerSesion, obtenerToken } from './sesionService'

const respuestaLogin = {
  token: 'token.de.prueba',
  tipo: 'Bearer',
  expiraEnSegundos: 3600,
  usuario: { id: 3, nombre: 'Ana Dueña', email: 'dueno@sanmarcos.cl', rol: 'DUENO', activo: true },
}

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  it('iniciarSesion envía el DTO a /auth/login y guarda la sesión', async () => {
    api.post.mockResolvedValue({ status: 200, data: respuestaLogin })

    const usuario = await iniciarSesion({ email: 'dueno@sanmarcos.cl', clave: '123456' })

    expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'dueno@sanmarcos.cl', clave: '123456' })
    expect(usuario.rol).toBe('DUENO')
    expect(obtenerToken()).toBe('token.de.prueba')
    expect(obtenerSesion().email).toBe('dueno@sanmarcos.cl')
  })

  it('si el login falla (401) no guarda ninguna sesión', async () => {
    api.post.mockRejectedValue({ response: { status: 401, data: { mensaje: 'Correo o contrasena incorrectos' } } })

    await expect(iniciarSesion({ email: 'x@x.cl', clave: 'malaclave' })).rejects.toBeTruthy()
    expect(obtenerSesion()).toBeNull()
  })

  it('registrarUsuario envía el DTO sin rol a /auth/registro', async () => {
    api.post.mockResolvedValue({ status: 201, data: { id: 5, rol: 'DUENO' } })
    const dto = { nombre: 'Luis', email: 'luis@correo.cl', clave: '123456' }

    const creado = await registrarUsuario(dto)

    expect(api.post).toHaveBeenCalledWith('/auth/registro', dto)
    expect(creado.rol).toBe('DUENO')
  })

  it('cerrarSesion borra el token del navegador', async () => {
    api.post.mockResolvedValue({ status: 200, data: respuestaLogin })
    await iniciarSesion({ email: 'dueno@sanmarcos.cl', clave: '123456' })

    cerrarSesion()

    expect(obtenerToken()).toBeNull()
    expect(obtenerSesion()).toBeNull()
  })
})
