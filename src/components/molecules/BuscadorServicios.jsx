import { useState } from 'react'
import CampoTexto from '../atoms/CampoTexto'
import Boton from '../atoms/Boton'

export default function BuscadorServicios(props) {
  const [texto, setTexto] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    if (texto.trim() === '') return
    props.onBuscar(texto.trim())
    setTexto('')
  }

  return (
    <form className="d-flex gap-2" role="search" onSubmit={enviar}>
      <CampoTexto
        type="search"
        placeholder="Buscar servicio"
        aria-label="Buscar servicio"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <Boton tipo="submit" variante="outline-light">Buscar</Boton>
    </form>
  )
}