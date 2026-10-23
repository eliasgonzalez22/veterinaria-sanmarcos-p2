import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('muestra errores si se envía vacío y no llama a onEnviar', async () => {
    const alEnviar = vi.fn()
    render(<FormularioLogin onEnviar={alEnviar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
    expect(alEnviar).not.toHaveBeenCalled()
  })

  it('llama a onEnviar con los datos si son válidos', async () => {
    const alEnviar = vi.fn()
    render(<FormularioLogin onEnviar={alEnviar} />)
    await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(alEnviar).toHaveBeenCalledWith({ email: 'ana@correo.cl', clave: '123456' })
  })
})