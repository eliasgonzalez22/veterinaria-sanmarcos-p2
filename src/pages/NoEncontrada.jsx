import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'

export default function NoEncontrada() {
  const navigate = useNavigate()

  return (
    <PlantillaPublica>
      <h1 className="h3">Página no encontrada</h1>
      <p>La dirección que escribiste no existe.</p>
      <Boton onClick={() => navigate('/servicios')}>Ir a servicios</Boton>
    </PlantillaPublica>
  )
}