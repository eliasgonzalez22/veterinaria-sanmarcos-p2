export const RECARGO_URGENCIA = 10000

export function calcularPrecioServicio(servicio, { fueraDeHorario = false } = {}) {
  if (servicio.codigo === 'SV002' && fueraDeHorario) {
    return servicio.precio + RECARGO_URGENCIA
  }
  return servicio.precio
}

export const formatearPrecio = (n) => `$${n.toLocaleString('es-CL')}`