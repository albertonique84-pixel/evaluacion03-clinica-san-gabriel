import './Citas.css'

// Calcula los totales a partir de las props (no guarda estado propio)
function ResumenCitas({ citas, estados }) {
  return (
    <section className="resumen-citas">
      <div className="resumen-caja">
        <span>Total</span>
        <strong>{citas.length}</strong>
      </div>
      {estados.map((estado) => (
        <div key={estado.id} className={`resumen-caja caja-${estado.nombre}`}>
          <span>{estado.nombre}</span>
          <strong>{citas.filter((c) => c.estado === estado.id).length}</strong>
        </div>
      ))}
    </section>
  )
}

export default ResumenCitas
