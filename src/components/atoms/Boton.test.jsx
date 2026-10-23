import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Boton from './Boton'

describe('Boton', () => {
  it('muestra su texto', () => {
    render(<Boton>Guardar</Boton>)
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('llama a onClick al hacer clic', async () => {
    const alClic = vi.fn()
    render(<Boton onClick={alClic}>Guardar</Boton>)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(alClic).toHaveBeenCalledTimes(1)
  })

  it('no llama a onClick si está deshabilitado', async () => {
    const alClic = vi.fn()
    render(<Boton onClick={alClic} disabled>Guardar</Boton>)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(alClic).not.toHaveBeenCalled()
  })
})