export default function Boton({ children, variante = 'success', tipo = 'button', ...props }) {
  return (
    <button type={tipo} className={`btn btn-${variante}`} {...props}>
      {children}
    </button>
  )
}