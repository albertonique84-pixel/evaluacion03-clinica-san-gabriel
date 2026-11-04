import { useState } from 'react'
import Boton from './Boton.jsx'
import { crearPaciente, mensajeError } from '../services/api.js'
import './Formulario.css'

const VACIO = { dni: '', nombres: '', fecha_nacimiento: '', telefono: '', correo: '' }

function validar(paciente) {
  const errores = {}
  if (!/^\d{8}$/.test(paciente.dni)) errores.dni = 'El DNI debe tener exactamente 8 dígitos.'
  if (paciente.nombres.trim() === '') errores.nombres = 'Los nombres son obligatorios.'
  if (paciente.fecha_nacimiento === '') errores.fecha_nacimiento = 'Indique la fecha de nacimiento.'
  if (paciente.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paciente.correo)) {
    errores.correo = 'Ingrese un correo válido (ejemplo: nombre@correo.com).'
  }
  return errores
}

function FormularioPaciente({ onPacienteCreado }) {
  const [paciente, setPaciente] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState('')
  const [errorApi, setErrorApi] = useState('')

  // Un único manejador para todos los campos
  const handleChange = (event) => {
    const { name, value } = event.target
    setPaciente({ ...paciente, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // evita que el navegador recargue la página
    setExito('')
    setErrorApi('')
    const encontrados = validar(paciente)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    try {
      const nuevo = await crearPaciente(paciente)
      setExito(`Paciente ${nuevo.nombres} registrado correctamente.`)
      setPaciente(VACIO)
      onPacienteCreado(nuevo)
    } catch (error) {
      setErrorApi(mensajeError(error))
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h3>Registrar paciente</h3>

      <div className="campo">
        <label htmlFor="dni">DNI *</label>
        <input id="dni" name="dni" value={paciente.dni} onChange={handleChange} maxLength={8} />
        {errores.dni && <small className="error-campo">{errores.dni}</small>}
      </div>

      <div className="campo">
        <label htmlFor="nombres">Nombres y apellidos *</label>
        <input id="nombres" name="nombres" value={paciente.nombres} onChange={handleChange} />
        {errores.nombres && <small className="error-campo">{errores.nombres}</small>}
      </div>

      <div className="campo">
        <label htmlFor="fecha_nacimiento">Fecha de nacimiento *</label>
        <input id="fecha_nacimiento" name="fecha_nacimiento" type="date"
          value={paciente.fecha_nacimiento} onChange={handleChange} />
        {errores.fecha_nacimiento && <small className="error-campo">{errores.fecha_nacimiento}</small>}
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" name="telefono" value={paciente.telefono} onChange={handleChange} />
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo</label>
        <input id="correo" name="correo" value={paciente.correo} onChange={handleChange} />
        {errores.correo && <small className="error-campo">{errores.correo}</small>}
      </div>

      {exito && <p className="mensaje-exito">{exito}</p>}
      {errorApi && <p className="mensaje-error">{errorApi}</p>}

      <Boton type="submit" texto="Guardar paciente" />
    </form>
  )
}

export default FormularioPaciente
