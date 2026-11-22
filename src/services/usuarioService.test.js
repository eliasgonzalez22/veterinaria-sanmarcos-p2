// Mock del service: se reemplaza la instancia de Axios por funciones falsas (vi.fn),
// así la prueba no necesita el backend encendido y controla qué "responde" la API.
vi.mock('./api', () => ({
  api: { get: vi.fn(), put: vi.fn(), post: vi.fn(), delete: vi.fn() },
}))

import { api } from './api'
import { listarUsuarios, actualizarUsuario, crearUsuario, desactivarUsuario } from './usuarioService'

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

  it('crearUsuario hace POST /usuarios con el DTO (incluye el rol)', async () => {
    const dto = { nombre: 'Nueva Recepcion', email: 'nueva@sanmarcos.cl', clave: '123456', rol: 'RECEPCIONISTA' }
    api.post.mockResolvedValue({ status: 201, data: { id: 9, ...dto, activo: true } })

    const creado = await crearUsuario(dto)

    expect(api.post).toHaveBeenCalledWith('/usuarios', dto)
    expect(creado.id).toBe(9)
  })

  it('desactivarUsuario hace DELETE /usuarios/{id}', async () => {
    api.delete.mockResolvedValue({ status: 204 })

    await desactivarUsuario(9)

    expect(api.delete).toHaveBeenCalledWith('/usuarios/9')
  })
})
