import { useNavigate } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import { servicios } from '../../data/servicios'

const categorias = [...new Set(servicios.map((s) => s.categoria))]

export default function PlantillaPublica(props) {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        categorias={categorias}
        onNavegar={navigate}
        onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
      />
      <main className="container py-4">{props.children}</main>
      <Footer onNavegar={navigate} />
    </>
  )
}