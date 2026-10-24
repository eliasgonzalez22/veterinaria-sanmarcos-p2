import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useTituloPagina } from '../hooks/useTituloPagina'

const articulos = [
  {
    slug: 'preparar-primera-consulta',
    titulo: 'Cómo preparar la primera consulta veterinaria',
    resumen: 'Unos datos simples ayudan a aprovechar mejor la visita de tu mascota.',
    secciones: [
      {
        titulo: 'Reúne sus antecedentes',
        texto: 'Lleva los registros de vacunas y desparasitación que tengas, además de información sobre enfermedades previas y medicamentos actuales. Si adoptaste a tu mascota recientemente, pregunta si la organización anterior tiene esos antecedentes.',
      },
      {
        titulo: 'Anota tus observaciones',
        texto: 'Antes de la cita, apunta los cambios que has notado y las preguntas que quieras hacer. Así puedes compartir la información con el equipo veterinario sin depender solo de la memoria.',
      },
      {
        titulo: 'Confirma cómo asistir',
        texto: 'Consulta a la clínica si debes llevar documentos, exámenes o seguir alguna indicación antes de la visita. Las recomendaciones dependen del motivo de la consulta.',
      },
    ],
    fuente: 'https://www.avma.org/resources/pet-owners/petcare/selecting-pet-dog',
    fuenteTexto: 'American Veterinary Medical Association: Selecting a pet dog',
  },
  {
    slug: 'cuidados-preventivos',
    titulo: 'Cuidados preventivos para perros y gatos',
    resumen: 'Los controles ayudan a conversar sobre las necesidades particulares de cada mascota.',
    secciones: [
      {
        titulo: 'Mantén controles periódicos',
        texto: 'Las visitas preventivas permiten revisar la salud de tu mascota y conversar sobre los cuidados adecuados para su etapa de vida.',
      },
      {
        titulo: 'Consulta su calendario de vacunas',
        texto: 'Las vacunas recomendadas pueden variar según la especie, edad, estado de salud y exposición a riesgos. Pide al médico veterinario un calendario adecuado para tu mascota.',
      },
      {
        titulo: 'Pregunta por prevención de parásitos',
        texto: 'Comenta el estilo de vida de tu mascota y consulta qué medidas preventivas corresponden. Sigue las indicaciones del equipo veterinario para elegir productos y frecuencia.',
      },
    ],
    fuente: 'https://ebusiness.avma.org/files/productdownloads/vaccination_brochure.pdf',
    fuenteTexto: 'American Veterinary Medical Association: How often should my pet be vaccinated?',
  },
]

export default function Blog() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const articulo = articulos.find((item) => item.slug === slug)
  useTituloPagina(articulo ? articulo.titulo : 'Blog')

  return (
    <PlantillaPublica>
      {slug && articulo ? (
        <article>
          <Button variant="link" className="px-0" onClick={() => navigate('/blog')}>
            ← Volver al blog
          </Button>
          <h1 className="display-6 fw-bold">{articulo.titulo}</h1>
          <p className="lead">{articulo.resumen}</p>
          {articulo.secciones.map((seccion) => (
            <section className="mb-4" key={seccion.titulo}>
              <h2 className="h4">{seccion.titulo}</h2>
              <p>{seccion.texto}</p>
            </section>
          ))}
          <p className="small text-muted">
            Información educativa general. Consulta con un profesional veterinario para recomendaciones específicas.
          </p>
          <p className="small">
            Fuente: <a href={articulo.fuente} target="_blank" rel="noreferrer">{articulo.fuenteTexto}</a>
          </p>
        </article>
      ) : slug ? (
        <section aria-labelledby="articulo-no-encontrado">
          <h1 id="articulo-no-encontrado" className="h3">No encontramos ese artículo</h1>
          <Button variant="success" onClick={() => navigate('/blog')}>Volver al blog</Button>
        </section>
      ) : (
        <section aria-labelledby="titulo-blog">
          <h1 id="titulo-blog" className="display-6 fw-bold">Consejos para cuidar a tu mascota</h1>
          <p className="lead mb-4">Artículos informativos para acompañarte en el cuidado de perros y gatos.</p>
          <Row as="ul" xs={1} md={2} className="g-3 list-unstyled">
            {articulos.map((item) => (
              <Col as="li" key={item.slug}>
                <Card as="article" className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2"><Badge bg="success">Consejos</Badge></div>
                    <Card.Title as="h2" className="h5">{item.titulo}</Card.Title>
                    <Card.Text>{item.resumen}</Card.Text>
                    <Button className="mt-auto align-self-start" variant="outline-success" onClick={() => navigate(`/blog/${item.slug}`)}>
                      Leer artículo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </PlantillaPublica>
  )
}