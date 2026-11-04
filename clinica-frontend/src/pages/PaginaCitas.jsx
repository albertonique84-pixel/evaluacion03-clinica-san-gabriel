import { useEffect, useState } from 'react'
import FormularioCita from '../components/FormularioCita.jsx'
import ListaCitas from '../components/ListaCitas.jsx'
import DetalleCita from '../components/DetalleCita.jsx'
import ResumenCitas from '../components/ResumenCitas.jsx'
import { getCitas, getEstados, getMedicos, getPacientes } from '../services/api.js'
import './Paginas.css'

// Componente padre: guarda el estado compartido y lo reparte por props
function PaginaCitas() {
  const [citas, setCitas] = useState([])
  const [medicos, setMedicos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [estados, setEstados] = useState([])
  const [seleccionadaId, setSeleccionadaId] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getCitas(), getMedicos(), getPacientes(), getEstados()])
      .then(([c, m, p, e]) => {
        setCitas(c)
        setMedicos(m)
        setPacientes(p)
        setEstados(e)
      })
      .catch(() => setError('No se pudieron cargar los datos de la API.'))
      .finally(() => setCargando(false))
  }, [])

  // Hijo -> padre: FormularioCita avisa que se creó una cita
  const agregarCita = (nueva) => {
    setCitas([...citas, nueva])
    setSeleccionadaId(nueva.id)
  }

  // Hijo -> padre: DetalleCita avisa que cambió el estado
  const cambiarEstado = (citaActualizada) => {
    setCitas(citas.map((c) => (c.id === citaActualizada.id ? citaActualizada : c)))
  }

  const citaSeleccionada = citas.find((c) => c.id === seleccionadaId)

  if (cargando) return <p className="mensaje-cargando">Cargando…</p>
  if (error) return <p className="mensaje-error">{error}</p>

  return (
    <>
      <ResumenCitas citas={citas} estados={estados} />
      <div className="citas-layout">
        <FormularioCita medicos={medicos} pacientes={pacientes} estados={estados} onCitaCreada={agregarCita} />
        <ListaCitas citas={citas} seleccionadaId={seleccionadaId} onSeleccionar={setSeleccionadaId} />
        <DetalleCita cita={citaSeleccionada} estados={estados} onCambiarEstado={cambiarEstado} />
      </div>
    </>
  )
}

export default PaginaCitas
