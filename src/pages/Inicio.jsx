import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Inicio() {
  const navigate = useNavigate()
  const contexto = useServicios()
  const categorias = [...new Set(contexto.servicios.map((s) => s.categoria))]
  useTituloPagina('Inicio')

  return (
    <PlantillaPublica>
      <section className="text-center py-5">
        <h1 className="display-5 fw-bold">Veterinaria San Marcos</h1>
        <p className="lead">Cuidamos a tu mascota desde 2009 en Rancagua.</p>
        <Boton onClick={() => navigate('/servicios')}>Ver servicios</Boton>
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
      <section className="container my-5" aria-labelledby="titulo-ubicacion">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-4">
            <h2 id="titulo-ubicacion" className="h3">Encuéntranos en Rancagua</h2>
            <p className="mb-2"><strong>Ubicación de referencia:</strong> Hospital Clínico Veterinario Koning</p>
            <p className="text-muted">Av. Diagonal Doñihue 1302, Rancagua</p>
            <a className="btn btn-outline-success" href="https://www.google.com/maps/search/?api=1&query=Hospital+Cl%C3%ADnico+Veterinario+Koning%2C+Av.+Diagonal+Do%C3%B1ihue+1302%2C+Rancagua" target="_blank" rel="noreferrer">Abrir en Google Maps</a>
          </div>
          <div className="col-12 col-lg-8">
            <iframe
              title="Mapa de ubicación de referencia en Rancagua"
              src="https://www.google.com/maps?q=Hospital+Cl%C3%ADnico+Veterinario+Koning%2C+Av.+Diagonal+Do%C3%B1ihue+1302%2C+Rancagua&output=embed"
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: '0.75rem' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </PlantillaPublica>
  )
}