import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Contacto from './pages/Contacto'
import Ofertas from './pages/Ofertas'
import Blog from './pages/Blog'
import Servicios from './pages/Servicios'
import DetalleServicio from './pages/DetalleServicio'
import NoEncontrada from './pages/NoEncontrada'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Agendar from './pages/Agendar'
import Confirmacion from './pages/Confirmacion'
import Resultado from './pages/Resultado'
import MisCitas from './pages/MisCitas'
import Admin from './pages/Admin'
import AdminServicios from './pages/AdminServicios'
import AdminServicioForm from './pages/AdminServicioForm'
import Nosotros from './pages/Nosotros'
import Categorias from './pages/Categorias'
import AdminResumen from './pages/AdminResumen'
import AdminUsuarios from './pages/AdminUsuarios'
import Perfil from './pages/Perfil'
import RutaProtegida from './routes/RutaProtegida'
import { SesionProvider } from './context/SesionContext'
import { ROLES, ROLES_PERSONAL } from './utils/roles'

// Quién puede entrar a cada grupo de páginas (el backend vuelve a comprobarlo en cada solicitud).
const SOLO_DUENO = [ROLES.DUENO]
const SOLO_ADMIN = [ROLES.ADMINISTRADOR]

// Atajo para no repetir <RutaProtegida> en cada ruta.
function protegida(pagina, roles) {
  return <RutaProtegida roles={roles}>{pagina}</RutaProtegida>
}

export default function App() {
  return (
    <SesionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/categoria/:nombre" element={<Servicios />} />
          <Route path="/buscar/:texto" element={<Servicios />} />
          <Route path="/servicio/:id" element={<DetalleServicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/agendar/:id" element={protegida(<Agendar />, SOLO_DUENO)} />
          <Route path="/confirmacion" element={protegida(<Confirmacion />, SOLO_DUENO)} />
          <Route path="/resultado" element={protegida(<Resultado />, SOLO_DUENO)} />
          <Route path="/mis-citas" element={protegida(<MisCitas />, SOLO_DUENO)} />
          <Route path="/admin" element={protegida(<Admin />, ROLES_PERSONAL)} />
          <Route path="/admin/servicios" element={protegida(<AdminServicios />, ROLES_PERSONAL)} />
          <Route path="/admin/servicios/nuevo" element={protegida(<AdminServicioForm />, ROLES_PERSONAL)} />
          <Route path="/admin/servicios/:id/editar" element={protegida(<AdminServicioForm />, ROLES_PERSONAL)} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/admin/resumen" element={protegida(<AdminResumen />, ROLES_PERSONAL)} />
          <Route path="/admin/usuarios" element={protegida(<AdminUsuarios />, SOLO_ADMIN)} />
          <Route path="/perfil" element={protegida(<Perfil />)} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </SesionProvider>
  )
}