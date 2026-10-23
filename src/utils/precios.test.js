import { calcularPrecioServicio, formatearPrecio, RECARGO_URGENCIA } from './precios'

describe('precios', () => {
  it('formatea el precio en pesos chilenos', () => {
    expect(formatearPrecio(15000)).toBe('$15.000')
  })

  it('no cobra recargo en un servicio normal', () => {
    const servicio = { codigo: 'SV001', precio: 15000 }
    expect(calcularPrecioServicio(servicio, { fueraDeHorario: true })).toBe(15000)
  })

  it('cobra recargo en la urgencia fuera de horario', () => {
    const servicio = { codigo: 'SV002', precio: 25000 }
    expect(calcularPrecioServicio(servicio, { fueraDeHorario: true })).toBe(25000 + RECARGO_URGENCIA)
  })

  it('no cobra recargo en la urgencia dentro del horario', () => {
    const servicio = { codigo: 'SV002', precio: 25000 }
    expect(calcularPrecioServicio(servicio)).toBe(25000)
  })
})