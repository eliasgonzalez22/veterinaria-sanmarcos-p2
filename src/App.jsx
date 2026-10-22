import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import DetalleServicio from './pages/DetalleServicio'
import NoEncontrada from './pages/NoEncontrada'

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
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </BrowserRouter>
  )
}