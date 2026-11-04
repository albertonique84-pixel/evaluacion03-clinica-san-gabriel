import './TarjetaMedico.css'

const FOTO_POR_DEFECTO = '/medico-default.svg'

// Tarjeta reutilizable con desestructuración de props
function TarjetaMedico({ nombres, cmp, especialidad, foto = FOTO_POR_DEFECTO }) {
  return (
    <article className="tarjeta-medico">
      <img src={foto} alt={`Foto de ${nombres}`} />
      <div>
        <h3>Dr(a). {nombres}</h3>
        <p className="tarjeta-especialidad">{especialidad}</p>
        <p className="tarjeta-cmp">CMP {cmp}</p>
      </div>
    </article>
  )
}

export default TarjetaMedico
