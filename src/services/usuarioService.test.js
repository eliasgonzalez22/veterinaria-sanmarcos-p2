// Mock del service: se reemplaza la instancia de Axios por funciones falsas (vi.fn),
// así la prueba no necesita el backend encendido y controla qué "responde" la API.
vi.mock('./api', () => ({
  api: { get: vi.fn(), put: vi.fn() },
}))

import { api } from './api'
import { listarUsuarios, actualizarUsuario } from './usuarioService'

describe('usuarioService (API)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('listarUsuarios hace GET /usuarios y devuelve respuesta.data', async () => {
    const lista = [{ id: 1, nombre: 'Administrador', email: 'admin@sanmarcos.cl', rol: 'ADMINISTRADOR' }]
    api.get.mockResolvedValue({ status: 200, data: lista })

    const resultado = await listarUsuarios()

    expect(api.get).toHaveBeenCalledWith('/usuarios')
    expect(resultado).toEqual(lista)
  })

  it('actualizarUsuario hace PUT /usuarios/{id} solo con los cambios', async () => {
    api.put.mockResolvedValue({ status: 200, data: { id: 3, nombre: 'Ana Pérez' } })

    const resultado = await actualizarUsuario(3, { nombre: 'Ana Pérez' })

    expect(api.put).toHaveBeenCalledWith('/usuarios/3', { nombre: 'Ana Pérez' })
    expect(resultado.nombre).toBe('Ana Pérez')
  })

  it('propaga el error 403 para que la página muestre el mensaje', async () => {
    api.get.mockRejectedValue({ response: { status: 403, data: { mensaje: 'Sin permiso' } } })

    await expect(listarUsuarios()).rejects.toMatchObject({ response: { status: 403 } })
  })
})
