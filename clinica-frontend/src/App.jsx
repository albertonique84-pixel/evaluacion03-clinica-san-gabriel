import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import PiePagina from './components/PiePagina.jsx'
import PaginaPacientes from './pages/PaginaPacientes.jsx'
import PaginaMedicos from './pages/PaginaMedicos.jsx'
import PaginaCitas from './pages/PaginaCitas.jsx'
import { getEspecialidades } from './services/api.js'

const SECCIONES = [
  { id: 'inicio', titulo: 'Especialidades', icono: 'Es' },
  { id: 'pacientes', titulo: 'Pacientes', icono: 'Pa' },
  { id: 'medicos', titulo: 'Médicos', icono: 'Md' },
  { id: 'citas', titulo: 'Citas', icono: 'Ci' },
]

function App() {
  const [especialidades, setEspecialidades] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [seccion, setSeccion] = useState('inicio')

  // Se ejecuta una sola vez, al montar el componente
  useEffect(() => {
    getEspecialidades()
      .then((datos) => setEspecialidades(datos))
      .catch(() => setError('No se pudo conectar con la API de la clínica. Verifique que Django esté encendido.'))
      .finally(() => setCargando(false))
  }, [])

  return (
    <>
      <Encabezado />

      <div className="app">
        <nav className="menu">
          <p className="menu-titulo">Recepción</p>
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              className={seccion === s.id ? 'activo' : ''}
              onClick={() => setSeccion(s.id)}
            >
              <span>{s.icono}</span>
              {s.titulo}
            </button>
          ))}
        </nav>

        <main className="contenido">
          {seccion === 'inicio' && (
            <section className="panel">
              <h2>Nuestras especialidades</h2>
              {cargando && <p className="mensaje-cargando">Cargando…</p>}
              {error && <p className="mensaje-error">{error}</p>}
              {!cargando && !error && (
                <ul className="especialidades">
                  {especialidades.map((esp) => (
                    <li key={esp.id}>
                      <span className="inicial">{esp.nombre.charAt(0)}</span>
                      <strong>{esp.nombre}</strong>
                      <p>{esp.descripcion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {seccion === 'pacientes' && <PaginaPacientes />}
          {seccion === 'medicos' && <PaginaMedicos especialidades={especialidades} />}
          {seccion === 'citas' && <PaginaCitas />}
        </main>
      </div>

      <PiePagina />
    </>
  )
}

export default App
