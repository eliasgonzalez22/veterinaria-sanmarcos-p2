import { render, screen } from '@testing-library/react'
import EtiquetaEspecie from './EtiquetaEspecie'

describe('EtiquetaEspecie', () => {
  it('muestra la especie recibida por props', () => {
    render(<EtiquetaEspecie especie="Perro / Gato" />)
    expect(screen.getByText('Perro / Gato')).toBeInTheDocument()
  })
})