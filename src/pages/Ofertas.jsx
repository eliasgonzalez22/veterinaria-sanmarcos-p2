import { useNavigate } from 'react-router-dom'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { formatearPrecio } from '../utils/precios'

const codigosDestacados = ['SV001', 'VA001', 'DE001']

export default function Ofertas() {
  const navigate = useNavigate()
  const { servicios } = useServicios()
  const destacados = codigosDestacados
    .map((codigo) => servicios.find((servicio) => servicio.codigo === codigo))
    .filter(Boolean)
  useTituloPagina('Ofertas')

  return (
    <PlantillaPublica>
      <section aria-labelledby="titulo-ofertas" className="mb-4">
        <h1 id="titulo-ofertas" className="display-6 fw-bold">Ofertas y servicios destacados</h1>
        <p className="lead">Conoce algunos servicios recomendados para cuidar a tu mascota.</p>
        <p className="text-muted">Los precios son los del catálogo; no representan descuentos promocionales.</p>
      </section>

      {destacados.length === 0 ? (
        <p role="status" className="alert alert-info">No hay servicios destacados disponibles por ahora.</p>
      ) : (
        <Row as="ul" xs={1} md={2} xl={3} className="g-3 list-unstyled">
          {destacados.map((servicio) => (
            <Col as="li" key={servicio.codigo}>
              <Card as="article" className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2"><Badge bg="success">Destacado</Badge></div>
                  <Card.Title as="h2" className="h5">{servicio.nombre}</Card.Title>
                  <p className="text-muted small">{servicio.categoria} · {servicio.especie} · {servicio.duracion}</p>
                  <p className="fw-bold mt-auto">{formatearPrecio(servicio.precio)}</p>
                  <Boton variante="outline-success" onClick={() => navigate(`/servicio/${servicio.id}`)}>
                    Ver detalle
                  </Boton>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PlantillaPublica>
  )
}