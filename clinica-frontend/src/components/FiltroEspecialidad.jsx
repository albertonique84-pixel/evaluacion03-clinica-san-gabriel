import { useEffect, useState } from 'react'
import TarjetaMedico from './TarjetaMedico.jsx'
import { getMedicos } from '../services/api.js'
import '../pages/Paginas.css'

function FiltroEspecialidad({ especialidades }) {
  const [especialidadId, setEspecialidadId] = useState('')
  const [medicos, setMedicos] = useState([])
  const [cargando, setCargando] = useState(true)

  // Cada vez que cambia la especialidad se consulta /api/medicos/?especialidad=<id>
  useEffect(() => {
    getMedicos(especialidadId)
      .then(setMedicos)
      .finally(() => setCargando(false))
  }, [especialidadId])

  const handleChange = (event) => {
    setCargando(true)
    setEspecialidadId(event.target.value)
  }

  return (
    <section className="panel">
      <h2>
        Staff médico
        <span className="contador">{medicos.length} médico(s) mostrados</span>
      </h2>

      <div className="campo" style={{ maxWidth: 320 }}>
        <label htmlFor="filtro">Filtrar por especialidad</label>
        <select id="filtro" value={especialidadId} onChange={handleChange}>
          <option value="">Todas las especialidades</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.id}>{esp.nombre}</option>
          ))}
        </select>
      </div>

      {cargando ? (
        <p className="mensaje-cargando">Cargando…</p>
      ) : (
        <div className="grilla-medicos">
          {medicos.map((m) => (
            <TarjetaMedico key={m.id} nombres={m.nombres} cmp={m.cmp} especialidad={m.especialidad_nombre} />
          ))}
        </div>
      )}
    </section>
  )
}

export default FiltroEspecialidad
