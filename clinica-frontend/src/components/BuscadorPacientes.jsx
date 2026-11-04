import Boton from './Boton.jsx'
import './Tabla.css'

function BuscadorPacientes({ texto, onBuscar, onLimpiar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar por nombre o DNI…"
        value={texto}
        onChange={(e) => onBuscar(e.target.value)}
      />
      <Boton texto="Limpiar" variante="secundario" onClick={onLimpiar} />
    </div>
  )
}

export default BuscadorPacientes
