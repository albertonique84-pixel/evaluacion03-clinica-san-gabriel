import './PiePagina.css'

const anio = new Date().getFullYear()

function PiePagina() {

  return (
    <footer className="pie">
      <p>Clínica San Gabriel · Av. Larco 1250, Trujillo · Central de citas (044) 485 200</p>
      <p>© {anio} Sistema de citas médicas - Django REST Framework + React</p>
    </footer>
  )
}

export default PiePagina
