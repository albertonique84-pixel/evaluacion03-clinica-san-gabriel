import './Boton.css'

// Botón reutilizable: muestra "texto" o lo que se envíe como children
function Boton({ texto, variante = 'primario', onClick, children, type = 'button', disabled = false }) {
  return (
    <button type={type} className={`boton boton-${variante}`} onClick={onClick} disabled={disabled}>
      {children || texto}
    </button>
  )
}

export default Boton
