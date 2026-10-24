import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import imagenVeterinaria from '../assets/veterinaria-inicio.jpg'

export default function Inicio() {
  const navigate = useNavigate()
  const contexto = useServicios()
  const categorias = [...new Set(contexto.servicios.map((s) => s.categoria))]
  useTituloPagina('Inicio')

  return (
    <PlantillaPublica>
      <section className="py-4 py-lg-5" aria-labelledby="titulo-inicio">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 id="titulo-inicio" className="display-5 fw-bold">Veterinaria San Marcos</h1>
            <p className="lead">Cuidamos a tu mascota desde 2009 en Rancagua.</p>
            <Boton onClick={() => navigate('/servicios')}>Ver servicios</Boton>
          </div>
          <div className="col-12 col-lg-6">
            <img
              src={imagenVeterinaria}
              alt="Veterinaria atendiendo a un cachorro y un gatito"
              className="img-fluid rounded-4 shadow"
              style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="h4 text-center mb-3">¿Qué ofrecemos?</h2>
        <ul className="row row-cols-2 row-cols-md-3 g-3 list-unstyled">
          {categorias.map((c) => (
            <li className="col" key={c}>
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <h3 className="h5">{c}</h3>
                  <Boton
                    variante="outline-success"
                    onClick={() => navigate(`/categoria/${encodeURIComponent(c)}`)}
                  >
                    Ver servicios
                  </Boton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PlantillaPublica>
  )
}