import { useState } from 'react'
import Boton from './Boton.jsx'
import { actualizarCita, mensajeError } from '../services/api.js'
import './Citas.css'

function DetalleCita({ cita, estados, onCambiarEstado }) {
  const [error, setError] = useState('')

  if (!cita) {
    return (
      <section className="panel">
        <h3>Detalle de la cita</h3>
        <p className="mensaje-cargando">Seleccione "Ver detalle" en una cita de la lista.</p>
      </section>
    )
  }

  const cambiar = async (nombreEstado) => {
    setError('')
    const estado = estados.find((e) => e.nombre === nombreEstado)
    try {
      const actualizada = await actualizarCita(cita.id, { estado: estado.id }) // PATCH
      onCambiarEstado(actualizada) // avisa al padre
    } catch (err) {
      setError(mensajeError(err))
    }
  }

  const bloqueada = cita.estado_final // atendida o cancelada

  return (
    <section className="panel detalle-cita">
      <h3>Detalle de la cita #{cita.id}</h3>
      <dl>
        <dt>Paciente</dt><dd>{cita.paciente_nombre}</dd>
        <dt>Médico</dt><dd>{cita.medico_nombre}</dd>
        <dt>Especialidad</dt><dd>{cita.especialidad}</dd>
        <dt>Fecha</dt><dd>{cita.fecha}</dd>
        <dt>Hora</dt><dd>{cita.hora.slice(0, 5)}</dd>
        <dt>Motivo</dt><dd>{cita.motivo}</dd>
        <dt>Estado</dt>
        <dd><span className={`estado estado-${cita.estado_nombre}`}>{cita.estado_nombre}</span></dd>
      </dl>

      {error && <p className="mensaje-error">{error}</p>}
      {bloqueada && <p className="aviso-final">La cita está en un estado final y ya no se puede modificar.</p>}

      <div className="acciones">
        <Boton texto="Confirmar" onClick={() => cambiar('confirmada')}
          disabled={bloqueada || cita.estado_nombre === 'confirmada'} />
        <Boton texto="Marcar como atendida" variante="exito" onClick={() => cambiar('atendida')} disabled={bloqueada} />
        <Boton texto="Cancelar" variante="peligro" onClick={() => cambiar('cancelada')} disabled={bloqueada} />
      </div>
    </section>
  )
}

export default DetalleCita
