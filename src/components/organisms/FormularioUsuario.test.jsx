import { render, screen, fireEvent } from '@testing-library/react'
import FormularioUsuario from './FormularioUsuario'

describe('FormularioUsuario', () => {
  it('al crear, exige nombre, correo y contraseña antes de llamar a onGuardar', () => {
    const onGuardar = vi.fn()
    render(<FormularioUsuario usuario={null} onGuardar={onGuardar} onCancelar={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }))

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('al editar, la contraseña es opcional y se envían los datos con el rol', () => {
    const onGuardar = vi.fn()
    const usuario = { id: 3, nombre: 'Ana Duena', email: 'dueno@sanmarcos.cl', rol: 'DUENO', activo: true }
    render(<FormularioUsuario usuario={usuario} onGuardar={onGuardar} onCancelar={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Rol'), { target: { value: 'RECEPCIONISTA' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(onGuardar).toHaveBeenCalledWith(expect.objectContaining({ rol: 'RECEPCIONISTA', clave: '', activo: true }))
  })

  it('en la cuenta propia no permite cambiar el rol ni desactivarse', () => {
    const usuario = { id: 1, nombre: 'Administrador', email: 'admin@sanmarcos.cl', rol: 'ADMINISTRADOR', activo: true }
    render(<FormularioUsuario usuario={usuario} esPropio onGuardar={vi.fn()} onCancelar={vi.fn()} />)

    expect(screen.getByLabelText('Rol')).toBeDisabled()
    expect(screen.getByLabelText('Cuenta activa')).toBeDisabled()
  })
})
