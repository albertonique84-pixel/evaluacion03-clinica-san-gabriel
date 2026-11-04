import { RECEPCIONISTAS, useClinica } from '../context/ClinicaContext.jsx'
import './Encabezado.css'

const hoy = new Date()

function Encabezado() {
  // Lee la recepcionista y la fecha de trabajo desde el contexto (sin props)
  const { recepcionista, setRecepcionista, fechaTrabajo, setFechaTrabajo } = useClinica()

  return (
    <header className="encabezado">
      <div className="encabezado-marca">
        <img src="/logo-clinica.svg" alt="Logo de la Clínica San Gabriel" />
        <div>
          <h1>Clínica San Gabriel</h1>
          <span>
            {hoy.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="encabezado-recepcion">
        <label>
          Recepcionista
          <select value={recepcionista} onChange={(e) => setRecepcionista(e.target.value)}>
            {RECEPCIONISTAS.map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Fecha de trabajo
          <input type="date" value={fechaTrabajo} onChange={(e) => setFechaTrabajo(e.target.value)} />
        </label>
      </div>
    </header>
  )
}

export default Encabezado
