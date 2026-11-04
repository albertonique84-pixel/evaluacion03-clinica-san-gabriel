import Boton from './Boton.jsx'
import './Citas.css'

function ItemCita({ cita, seleccionada, onSeleccionar }) {
  return (
    <li className={seleccionada ? 'item-cita seleccionada' : 'item-cita'}>
      <div>
        <strong>{cita.fecha} · {cita.hora.slice(0, 5)}</strong>
        <span className={`estado estado-${cita.estado_nombre}`}>{cita.estado_nombre}</span>
        <p>{cita.paciente_nombre}</p>
        <small>{cita.medico_nombre} — {cita.especialidad}</small>
      </div>
      {/* hermano -> padre: se notifica el id de la cita elegida */}
      <Boton texto="Ver detalle" variante="secundario" onClick={() => onSeleccionar(cita.id)} />
    </li>
  )
}

export default ItemCita
