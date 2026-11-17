import { esPersonal, tieneRol, nombreRol, rutaInicioSegunRol, ROLES } from './roles'

const admin = { rol: ROLES.ADMINISTRADOR }
const recepcion = { rol: ROLES.RECEPCIONISTA }
const dueno = { rol: ROLES.DUENO }

describe('roles', () => {
  it('el administrador y la recepcionista son personal; el dueño no', () => {
    expect(esPersonal(admin)).toBe(true)
    expect(esPersonal(recepcion)).toBe(true)
    expect(esPersonal(dueno)).toBe(false)
    expect(esPersonal(null)).toBe(false)
  })

  it('tieneRol compara contra la lista de roles permitidos', () => {
    expect(tieneRol(admin, [ROLES.ADMINISTRADOR])).toBe(true)
    expect(tieneRol(recepcion, [ROLES.ADMINISTRADOR])).toBe(false)
    expect(tieneRol(dueno)).toBe(true) // sin lista: basta con tener sesión
    expect(tieneRol(null, [ROLES.DUENO])).toBe(false)
  })

  it('cada rol llega a su página de inicio', () => {
    expect(rutaInicioSegunRol(recepcion)).toBe('/admin')
    expect(rutaInicioSegunRol(dueno)).toBe('/mis-citas')
  })

  it('muestra el nombre del rol en español', () => {
    expect(nombreRol('DUENO')).toBe('Dueño de mascota')
  })
})
