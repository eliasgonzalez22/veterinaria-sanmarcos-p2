import { useState } from 'react'
import { Form } from 'react-bootstrap'
import CampoFormulario from '../molecules/CampoFormulario'
import Selector from '../atoms/Selector'
import Boton from '../atoms/Boton'
import { validarObligatorio, validarPrecio } from '../../utils/validaciones'

export default function FormularioServicio(props) {
  const base = props.inicial || {
    codigo: '',
    categoria: props.categorias[0],
    nombre: '',
    especie: 'Perro / Gato',
    duracion: '30 min',
    precio: '',
    obs: '',
  }
  const [datos, setDatos] = useState({ ...base, precio: String(base.precio) })
  const [errores, setErrores] = useState({ codigo: '', nombre: '', duracion: '', precio: '' })

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor })
  }

  function enviar(evento) {
    evento.preventDefault()
    const nuevos = {
      codigo: validarObligatorio(datos.codigo, 'El código'),
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      duracion: validarObligatorio(datos.duracion, 'La duración'),
      precio: validarPrecio(datos.precio),
    }
    setErrores(nuevos)
    if (!nuevos.codigo && !nuevos.nombre && !nuevos.duracion && !nuevos.precio) {
      props.onEnviar({
        ...datos,
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
      })
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="card card-body shadow-sm">
      <h2 className="h4 mb-3">{props.inicial ? 'Editar servicio' : 'Nuevo servicio'}</h2>
      <CampoFormulario id="srv-codigo" etiqueta="Código" valor={datos.codigo} onCambio={(v) => cambiar('codigo', v)} error={errores.codigo} />
      <CampoFormulario id="srv-nombre" etiqueta="Nombre" valor={datos.nombre} onCambio={(v) => cambiar('nombre', v)} error={errores.nombre} />
      <Form.Group className="mb-3" controlId="srv-categoria">
        <Form.Label>Categoría</Form.Label>
        <Selector
          opciones={props.categorias}
          value={datos.categoria}
          onChange={(e) => cambiar('categoria', e.target.value)}
        />
      </Form.Group>
      <CampoFormulario id="srv-especie" etiqueta="Especie" valor={datos.especie} onCambio={(v) => cambiar('especie', v)} error="" />
      <CampoFormulario id="srv-duracion" etiqueta="Duración" valor={datos.duracion} onCambio={(v) => cambiar('duracion', v)} error={errores.duracion} />
      <CampoFormulario id="srv-precio" etiqueta="Precio (CLP)" tipo="number" valor={datos.precio} onCambio={(v) => cambiar('precio', v)} error={errores.precio} />
      <CampoFormulario id="srv-obs" etiqueta="Observaciones (opcional)" valor={datos.obs} onCambio={(v) => cambiar('obs', v)} error="" />
      <div className="d-flex gap-2">
        <Boton tipo="submit">Guardar</Boton>
        <Boton variante="outline-secondary" onClick={props.onCancelar}>Cancelar</Boton>
      </div>
    </Form>
  )
}