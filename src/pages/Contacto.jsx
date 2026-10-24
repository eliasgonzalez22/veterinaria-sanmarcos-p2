import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useTituloPagina } from '../hooks/useTituloPagina'

const mapaUrl = 'https://www.google.com/maps?q=Hospital+Cl%C3%ADnico+Veterinario+Koning%2C+Av.+Diagonal+Do%C3%B1ihue+1302%2C+Rancagua&output=embed'
const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Hospital+Cl%C3%ADnico+Veterinario+Koning%2C+Av.+Diagonal+Do%C3%B1ihue+1302%2C+Rancagua'

export default function Contacto() {
  useTituloPagina('Contacto')

  return (
    <PlantillaPublica>
      <section className="mb-4" aria-labelledby="titulo-contacto">
        <h1 id="titulo-contacto" className="display-6 fw-bold">Contacto y ubicación</h1>
        <p className="lead">Encuentra nuestra ubicación veterinaria de referencia en Rancagua.</p>
      </section>

      <section className="row g-4 align-items-stretch" aria-label="Datos de ubicación">
        <div className="col-12 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h4">Veterinaria de referencia</h2>
              <p className="mb-1"><strong>Hospital Clínico Veterinario Koning</strong></p>
              <p>Av. Diagonal Doñihue 1302, Rancagua, O’Higgins.</p>
              <p className="small text-muted">Esta dirección corresponde al centro veterinario elegido como referencia para el mapa del proyecto.</p>
              <a className="btn btn-success" href={googleMapsUrl} target="_blank" rel="noreferrer">
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="ratio ratio-4x3 rounded overflow-hidden shadow-sm">
            <iframe
              title="Mapa de ubicación del Hospital Clínico Veterinario Koning en Rancagua"
              src={mapaUrl}
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