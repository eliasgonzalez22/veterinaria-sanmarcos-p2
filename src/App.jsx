import { Routes, Route } from 'react-router-dom'
import PlantillaPublica from './components/templates/PlantillaPublica'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'

export default function App() {
  return (
    <Routes>
      <Route element={<PlantillaPublica />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
      </Route>
    </Routes>
  )
}