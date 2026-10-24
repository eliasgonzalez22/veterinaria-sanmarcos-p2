import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Categorias() {
  const navigate = useNavigate()
  const contexto = useServicios()
  const categorias = [...new Set(contexto.servicios.map((s) => s.categoria))]
  useTituloPagina('Categorías')

  return (
    <PlantillaPublica>
      <h1 className="h3 mb-3">Categorías de servicios</h1>
      <ul className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 list-unstyled">
        {categorias.map((c) => {
          const cantidad = contexto.servicios.filter((s) => s.categoria === c).length
          return (
            <li className="col" key={c}>
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5">{c}</h2>
                  <p className="text-muted">{cantidad} servicios</p>
                  <Boton
                    variante="outline-success"
                    onClick={() => navigate(`/categoria/${encodeURIComponent(c)}`)}
                  >
                    Ver servicios
                  </Boton>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </PlantillaPublica>
  )
}