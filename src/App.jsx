import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import DetalleServicio from './pages/DetalleServicio'
import NoEncontrada from './pages/NoEncontrada'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Agendar from './pages/Agendar'
import Confirmacion from './pages/Confirmacion'
import Resultado from './pages/Resultado'
import MisCitas from './pages/MisCitas'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/categoria/:nombre" element={<Servicios />} />
        <Route path="/buscar/:texto" element={<Servicios />} />
        <Route path="/servicio/:id" element={<DetalleServicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/agendar/:id" element={<Agendar />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </BrowserRouter>
  )
}