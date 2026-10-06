import { Link } from 'react-router-dom'
import { servicios } from '../data/servicios'

export default function Inicio() {
  const categorias = [...new Set(servicios.map((s) => s.categoria))]

  return (
    <>
      <section className="text-center py-5">
        <h1 className="display-5 fw-bold">Veterinaria San Marcos</h1>
        <p className="lead">Cuidamos a tu mascota desde 2009 en Rancagua.</p>
        <Link to="/servicios" className="btn btn-success btn-lg">Ver servicios</Link>
      </section>
      <section>
        <h2 className="h4 text-center mb-3">¿Qué ofrecemos?</h2>
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {categorias.map((c) => (
            <div className="col" key={c}>
              <div className="card text-center h-100 shadow-sm">
                <div className="card-body fw-semibold">{c}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}