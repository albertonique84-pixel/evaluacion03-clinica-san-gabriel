import Boton from './Boton.jsx'
import './Tabla.css'

function TablaPacientes({ pacientes, onEliminar }) {
  if (pacientes.length === 0) {
    return <p className="mensaje-cargando">No hay pacientes que coincidan con la búsqueda.</p>
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombres</th>
          <th>Nacimiento</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((p) => (
          <tr key={p.id}>
            <td>{p.dni}</td>
            <td>{p.nombres}</td>
            <td>{p.fecha_nacimiento}</td>
            <td>{p.telefono}</td>
            <td>{p.correo}</td>
            <td>
              {/* función flecha para pasar el id sin ejecutar la función al renderizar */}
              <Boton texto="Eliminar" variante="peligro" onClick={() => onEliminar(p)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaPacientes
