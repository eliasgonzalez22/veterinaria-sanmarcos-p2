import CampoTexto from '../atoms/CampoTexto'
import Selector from '../atoms/Selector'

export default function BuscadorServicios({ busqueda, onBusqueda, categoria, onCategoria, categorias }) {
  return (
    <div className="row g-2 mb-4">
      <div className="col-12 col-md-6">
        <CampoTexto
          id="busqueda"
          placeholder="Buscar servicio..."
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-4">
        <Selector
          id="categoria"
          opciones={categorias}
          value={categoria}
          onChange={(e) => onCategoria(e.target.value)}
        />
      </div>
    </div>
  )
}