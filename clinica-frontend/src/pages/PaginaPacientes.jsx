import { useEffect, useState } from 'react'
import FormularioPaciente from '../components/FormularioPaciente.jsx'
import BuscadorPacientes from '../components/BuscadorPacientes.jsx'
import TablaPacientes from '../components/TablaPacientes.jsx'
import { eliminarPaciente, getPacientes, mensajeError } from '../services/api.js'
import './Paginas.css'

function PaginaPacientes() {
  const [pacientes, setPacientes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getPacientes()
      .then(setPacientes)
      .catch(() => setError('No se pudo cargar la lista de pacientes.'))
  }, [])

  const agregarPaciente = (nuevo) => setPacientes([...pacientes, nuevo])

  const eliminar = async (paciente) => {
    if (!window.confirm(`¿Eliminar al paciente ${paciente.nombres}? También se borrarán sus citas.`)) return
    try {
      await eliminarPaciente(paciente.id)
      setPacientes(pacientes.filter((p) => p.id !== paciente.id))
    } catch (err) {
      setError(mensajeError(err))
    }
  }

  // Filtro en vivo por nombre o DNI
  const texto = busqueda.toLowerCase()
  const filtrados = pacientes.filter(
    (p) => p.nombres.toLowerCase().includes(texto) || p.dni.includes(texto),
  )

  return (
    <div className="dos-columnas">
      <FormularioPaciente onPacienteCreado={agregarPaciente} />

      <section className="panel">
        <h2>Pacientes registrados ({filtrados.length})</h2>
        {error && <p className="mensaje-error">{error}</p>}
        <BuscadorPacientes texto={busqueda} onBuscar={setBusqueda} onLimpiar={() => setBusqueda('')} />
        <TablaPacientes pacientes={filtrados} onEliminar={eliminar} />
      </section>
    </div>
  )
}

export default PaginaPacientes
