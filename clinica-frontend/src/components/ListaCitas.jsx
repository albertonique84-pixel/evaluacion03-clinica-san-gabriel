import ItemCita from './ItemCita.jsx'
import './Citas.css'

function ListaCitas({ citas, seleccionadaId, onSeleccionar }) {
  return (
    <section className="panel">
      <h3>Citas programadas ({citas.length})</h3>
      {citas.length === 0 && <p className="mensaje-cargando">Todavía no hay citas.</p>}
      <ul className="lista-citas">
        {citas.map((cita) => (
          <ItemCita
            key={cita.id}
            cita={cita}
            seleccionada={cita.id === seleccionadaId}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </ul>
    </section>
  )
}

export default ListaCitas
