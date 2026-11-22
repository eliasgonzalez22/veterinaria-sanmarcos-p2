import { crearUsuarioRequestDto, actualizarUsuarioRequestDto } from './usuario.dto'

const original = { id: 7, nombre: 'Rita Recepcion', email: 'recepcion@sanmarcos.cl', rol: 'RECEPCIONISTA', activo: true }

describe('DTO de usuarios (Administrador)', () => {
  it('crear: normaliza el correo e incluye el rol elegido', () => {
    const dto = crearUsuarioRequestDto({ nombre: ' Ana ', email: 'ANA@SanMarcos.cl', clave: '123456', rol: 'DUENO', activo: true })
    expect(dto).toEqual({ nombre: 'Ana', email: 'ana@sanmarcos.cl', clave: '123456', rol: 'DUENO' })
  })

  it('editar: solo envía los campos que cambiaron', () => {
    const cambios = actualizarUsuarioRequestDto(
      { nombre: 'Rita Recepcion', email: 'recepcion@sanmarcos.cl', clave: '', rol: 'ADMINISTRADOR', activo: true },
      original
    )
    expect(cambios).toEqual({ rol: 'ADMINISTRADOR' })
  })

  it('editar: la contraseña solo viaja si se escribió una nueva', () => {
    const sinClave = actualizarUsuarioRequestDto({ ...original, clave: '' }, original)
    const conClave = actualizarUsuarioRequestDto({ ...original, clave: 'nueva123' }, original)
    expect(sinClave).toEqual({})
    expect(conClave).toEqual({ clave: 'nueva123' })
  })
})
