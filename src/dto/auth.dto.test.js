import { crearLoginRequestDto, crearRegistroRequestDto } from './auth.dto'

describe('DTO de autenticación', () => {
  it('el login normaliza el correo y no modifica la clave', () => {
    const dto = crearLoginRequestDto({ email: '  Dueno@SanMarcos.cl ', clave: ' 123456' })
    expect(dto).toEqual({ email: 'dueno@sanmarcos.cl', clave: ' 123456' })
  })

  it('el registro solo envía nombre, email y clave (nunca el rol)', () => {
    const dto = crearRegistroRequestDto({
      nombre: '  Ana  ',
      email: 'ANA@correo.cl',
      clave: '123456',
      confirmacion: '123456',
      rol: 'ADMINISTRADOR',
    })
    expect(dto).toEqual({ nombre: 'Ana', email: 'ana@correo.cl', clave: '123456' })
    expect(dto).not.toHaveProperty('rol')
  })
})
