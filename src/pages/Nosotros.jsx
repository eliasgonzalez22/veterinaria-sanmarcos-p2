import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Nosotros() {
  useTituloPagina('Nosotros')

  return (
    <PlantillaPublica>
      <section aria-labelledby="titulo-nosotros" className="mb-4">
        <h1 id="titulo-nosotros" className="display-6 fw-bold">Sobre nosotros</h1>
        <p className="lead">
          Veterinaria San Marcos cuida a las mascotas de Rancagua desde 2009.
        </p>
      </section>

      <section aria-labelledby="titulo-mision" className="row g-4">
        <h2 id="titulo-mision" className="visually-hidden">Misión, visión y valores</h2>
        <article className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Misión</h3>
              <p className="mb-0">
                Entregar atención veterinaria cercana y de calidad para que cada mascota
                viva más y mejor junto a su familia.
              </p>
            </div>
          </div>
        </article>
        <article className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Visión</h3>
              <p className="mb-0">
                Ser la clínica veterinaria de confianza de la región, reconocida por su
                trato humano y su atención oportuna.
              </p>
            </div>
          </div>
        </article>
        <article className="col-12 col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Valores</h3>
              <ul className="mb-0">
                <li>Respeto por los animales</li>
                <li>Honestidad con las familias</li>
                <li>Mejora continua</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </PlantillaPublica>
  )
}