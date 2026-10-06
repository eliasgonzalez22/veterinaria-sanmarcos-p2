import { useState } from 'react'
import { servicios } from '../data/servicios'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'

export default function Servicios() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const categorias = ['Todas', ...new Set(servicios.map((s) => s.categoria))]
  const filtrados = servicios.filter(
    (s) =>
      (categoria === 'Todas' || s.categoria === categoria) &&
      s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <h1 className="h3 mb-3">Servicios</h1>
      <BuscadorServicios
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        categoria={categoria}
        onCategoria={setCategoria}
        categorias={categorias}
      />
      <ListaServicios servicios={filtrados} />
    </>
  )
}