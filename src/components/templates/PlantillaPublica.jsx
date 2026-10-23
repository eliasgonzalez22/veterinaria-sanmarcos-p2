import { useNavigate } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import { Container } from 'react-bootstrap'
import { useServicios } from '../../context/ServiciosContext'



export default function PlantillaPublica(props) {
  const navigate = useNavigate()
  const contexto = useServicios()
  const categorias = [...new Set(contexto.servicios.map((s) => s.categoria))]
  
  return (
    <>
      <Navbar
        categorias={categorias}
        onNavegar={navigate}
        onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
      />
      <Container as="main" className="py-4">{props.children}</Container>
      <Footer onNavegar={navigate} />
    </>
  )
}