import {
  validarEmail,
  validarClave,
  validarNombre,
  validarConfirmacion,
} from './validaciones'

describe('validaciones', () => {
  it('rechaza un correo vacío', () => {
    expect(validarEmail('')).toBe('El correo es obligatorio')
  })

  it('rechaza un correo sin arroba', () => {
    expect(validarEmail('anacorreo.cl')).toBe('Ingresa un correo válido')
  })

  it('acepta un correo válido', () => {
    expect(validarEmail('ana@correo.cl')).toBe('')
  })

  it('rechaza una contraseña corta', () => {
    expect(validarClave('123')).toBe('La contraseña debe tener al menos 6 caracteres')
  })

  it('acepta una contraseña de 6 caracteres', () => {
    expect(validarClave('123456')).toBe('')
  })

  it('rechaza un nombre vacío', () => {
    expect(validarNombre('   ')).toBe('El nombre es obligatorio')
  })

  it('rechaza contraseñas que no coinciden', () => {
    expect(validarConfirmacion('123456', '654321')).toBe('Las contraseñas no coinciden')
  })
})