import { useEffect, useState } from 'react'
import { Table, Alert, Spinner, Modal, Badge } from 'react-bootstrap'
import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioUsuario from '../components/organisms/FormularioUsuario'
import FilaCita from '../components/molecules/FilaCita'
import Boton from '../components/atoms/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useSesion } from '../context/SesionContext'
import { listarUsuarios, crearUsuario, actualizarUsuario, desactivarUsuario } from '../services/usuarioService'
import { listarCitasDeUsuario } from '../services/citaService'
import { crearUsuarioRequestDto, actualizarUsuarioRequestDto } from '../dto/usuario.dto'
import { obtenerMensajeError } from '../utils/mensajesError'
import { nombreRol } from '../utils/roles'

// Página del Administrador: CRUD de usuarios contra la API.
//   Crear      -> POST   /usuarios        (elige el rol)
//   Listar     -> GET    /usuarios
//   Editar     -> PUT    /usuarios/{id}   (nombre, correo, clave, rol y estado)
//   Desactivar -> DELETE /usuarios/{id}   (borrado lógico) · Reactivar -> PUT con activo: true
export default function AdminUsuarios() {
  const { sesion } = useSesion()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  // Formulario en ventana modal: null = cerrado, { usuario: null } = nuevo, { usuario } = editar
  const [formulario, setFormulario] = useState(null)
  const [errorFormulario, setErrorFormulario] = useState('')
  const [guardando, setGuardando] = useState(false)

  // Confirmación antes de desactivar (sin window.confirm)
  const [porDesactivar, setPorDesactivar] = useState(null)
  const [historialDe, setHistorialDe] = useState(null)
  useTituloPagina('Admin · Usuarios')

  async function cargar() {
    setCargando(true)
    setError('')
    try {
      setUsuarios(await listarUsuarios())
    } catch (e) {
      setError(obtenerMensajeError(e))
    } finally {
      setCargando(false)
    }
  }

  // Al montar la página: GET /usuarios.
  useEffect(() => {
    cargar()
  }, [])

  function abrirNuevo() {
    setErrorFormulario('')
    setFormulario({ usuario: null })
  }

  function abrirEditar(usuario) {
    setErrorFormulario('')
    setFormulario({ usuario: usuario })
  }

  async function guardar(datos) {
    setGuardando(true)
    setErrorFormulario('')
    try {
      const original = formulario.usuario
      if (original) {
        const cambios = actualizarUsuarioRequestDto(datos, original)
        if (Object.keys(cambios).length === 0) {
          setFormulario(null)
          return
        }
        const actualizado = await actualizarUsuario(original.id, cambios)
        // Solo se actualiza la lista después de una respuesta exitosa (guía 20).
        setUsuarios((lista) => lista.map((u) => (u.id === actualizado.id ? actualizado : u)))
        setExito(`Usuario ${actualizado.email} actualizado.`)
      } else {
        const creado = await crearUsuario(crearUsuarioRequestDto(datos))
        setUsuarios((lista) => lista.concat(creado))
        setExito(`Usuario ${creado.email} creado con rol ${nombreRol(creado.rol)}.`)
      }
      setFormulario(null)
    } catch (e) {
      if (e.response && e.response.status === 409) {
        setErrorFormulario('Ya existe una cuenta con ese correo.')
      } else {
        setErrorFormulario(obtenerMensajeError(e))
      }
    } finally {
      setGuardando(false)
    }
  }

  async function confirmarDesactivar() {
    const usuario = porDesactivar
    setPorDesactivar(null)
    setError('')
    try {
      await desactivarUsuario(usuario.id)
      setUsuarios((lista) => lista.map((u) => (u.id === usuario.id ? { ...u, activo: false } : u)))
      setExito(`Usuario ${usuario.email} desactivado. Ya no puede iniciar sesión.`)
    } catch (e) {
      setError(obtenerMensajeError(e))
    }
  }

  async function reactivar(usuario) {
    setError('')
    try {
      const actualizado = await actualizarUsuario(usuario.id, { activo: true })
      setUsuarios((lista) => lista.map((u) => (u.id === actualizado.id ? actualizado : u)))
      setExito(`Usuario ${actualizado.email} reactivado.`)
    } catch (e) {
      setError(obtenerMensajeError(e))
    }
  }

  // Las citas siguen en el navegador hasta que exista el microservicio de citas.
  const historial = historialDe ? listarCitasDeUsuario(historialDe.email) : []

  return (
    <PlantillaAdmin>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Boton onClick={abrirNuevo}>Nuevo usuario</Boton>
      </div>

      {exito && <Alert variant="success" dismissible onClose={() => setExito('')}>{exito}</Alert>}
      {error && <Alert variant="danger" role="alert" dismissible onClose={() => setError('')}>{error}</Alert>}
      {cargando && (
        <p role="status"><Spinner animation="border" size="sm" className="me-2" />Cargando usuarios...</p>
      )}
      {!cargando && !error && usuarios.length === 0 && (
        <Alert variant="info">Todavía no hay usuarios registrados.</Alert>
      )}

      {usuarios.length > 0 && (
        <Table responsive striped bordered className="align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Citas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => {
              const esPropio = sesion && sesion.id === u.id
              return (
                <tr key={u.id}>
                  <td>{u.nombre}{esPropio && <Badge bg="secondary" className="ms-2">Tú</Badge>}</td>
                  <td>{u.email}</td>
                  <td>{nombreRol(u.rol)}</td>
                  <td>
                    <Badge bg={u.activo ? 'success' : 'secondary'}>{u.activo ? 'Activo' : 'Desactivado'}</Badge>
                  </td>
                  <td>{listarCitasDeUsuario(u.email).length}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <Boton variante="outline-primary" onClick={() => abrirEditar(u)}>Editar</Boton>
                      {u.activo ? (
                        !esPropio && (
                          <Boton variante="outline-danger" onClick={() => setPorDesactivar(u)}>Desactivar</Boton>
                        )
                      ) : (
                        <Boton variante="outline-success" onClick={() => reactivar(u)}>Reactivar</Boton>
                      )}
                      <Boton variante="outline-secondary" onClick={() => setHistorialDe(u)}>Historial</Boton>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}

      {historialDe && (
        <section aria-labelledby="titulo-historial" className="mt-4">
          <h2 id="titulo-historial" className="h5">Historial de {historialDe.nombre}</h2>
          {historial.length === 0 ? (
            <Alert variant="info">Este usuario aún no tiene citas.</Alert>
          ) : (
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Mascota</th>
                  <th>Fecha y hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((c) => (
                  <FilaCita key={c.id} cita={c} />
                ))}
              </tbody>
            </Table>
          )}
        </section>
      )}

      {/* Ventana para crear o editar */}
      <Modal show={formulario !== null} onHide={() => !guardando && setFormulario(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h5">
            {formulario && formulario.usuario ? `Editar a ${formulario.usuario.nombre}` : 'Nuevo usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorFormulario && <Alert variant="danger" role="alert">{errorFormulario}</Alert>}
          {formulario && (
            <FormularioUsuario
              key={formulario.usuario ? formulario.usuario.id : 'nuevo'}
              usuario={formulario.usuario}
              esPropio={Boolean(formulario.usuario && sesion && formulario.usuario.id === sesion.id)}
              cargando={guardando}
              onGuardar={guardar}
              onCancelar={() => setFormulario(null)}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Confirmación de desactivar (reemplaza a window.confirm) */}
      <Modal show={porDesactivar !== null} onHide={() => setPorDesactivar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h5">¿Desactivar usuario?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {porDesactivar && (
            <p className="mb-0">
              <strong>{porDesactivar.email}</strong> no podrá iniciar sesión. Sus datos y su historial se conservan,
              y puedes reactivarlo después.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Boton variante="outline-secondary" onClick={() => setPorDesactivar(null)}>Cancelar</Boton>
          <Boton variante="danger" onClick={confirmarDesactivar}>Sí, desactivar</Boton>
        </Modal.Footer>
      </Modal>
    </PlantillaAdmin>
  )
}
