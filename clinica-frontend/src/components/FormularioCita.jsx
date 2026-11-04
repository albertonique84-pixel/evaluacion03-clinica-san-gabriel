import { useState } from 'react'
import Boton from './Boton.jsx'
import { useClinica } from '../context/ClinicaContext.jsx'
import { crearCita, mensajeError } from '../services/api.js'
import './Formulario.css'

const VACIO = { paciente: '', medico: '', hora: '', motivo: '' }

function FormularioCita({ medicos, pacientes, estados, onCitaCreada }) {
  // La fecha de trabajo y la recepcionista llegan por contexto, no por props
  const { recepcionista, fechaTrabajo } = useClinica()
  const [cita, setCita] = useState(VACIO)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  const handleChange = (event) => {
    setCita({ ...cita, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setExito('')
    if (!cita.paciente || !cita.medico || !cita.hora || cita.motivo.trim() === '') {
      setError('Complete paciente, médico, hora y motivo.')
      return
    }
    const pendiente = estados.find((e) => e.nombre === 'pendiente')
    try {
      const nueva = await crearCita({ ...cita, fecha: fechaTrabajo, estado: pendiente.id })
      onCitaCreada(nueva) // avisa al padre con la cita que devolvió la API
      setExito(`Cita registrada para ${nueva.paciente_nombre}.`)
      setCita(VACIO)
    } catch (err) {
      setError(mensajeError(err)) // mensaje del 400 de Django
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h3>Reservar cita</h3>
      <div className="dato-contexto">
        Fecha de trabajo: <strong>{fechaTrabajo}</strong>
        <br />
        Registra: <strong>{recepcionista}</strong>
      </div>

      <div className="campo">
        <label htmlFor="paciente">Paciente</label>
        <select id="paciente" name="paciente" value={cita.paciente} onChange={handleChange}>
          <option value="">Seleccione…</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nombres} - {p.dni}</option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="medico">Médico</label>
        <select id="medico" name="medico" value={cita.medico} onChange={handleChange}>
          <option value="">Seleccione…</option>
          {medicos.map((m) => (
            <option key={m.id} value={m.id}>{m.nombres} ({m.especialidad_nombre})</option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="hora">Hora</label>
        <input id="hora" name="hora" type="time" value={cita.hora} onChange={handleChange} />
      </div>

      <div className="campo">
        <label htmlFor="motivo">Motivo</label>
        <textarea id="motivo" name="motivo" rows={2} value={cita.motivo} onChange={handleChange} />
      </div>

      {error && <p className="mensaje-error">{error}</p>}
      {exito && <p className="mensaje-exito">{exito}</p>}

      <Boton type="submit" texto="Registrar cita" />
    </form>
  )
}

export default FormularioCita
