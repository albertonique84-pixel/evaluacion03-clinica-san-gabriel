// URL base del backend Django REST Framework
const API_URL = 'http://localhost:8000/api/'

// Revisa la respuesta: si no es correcta lanza un error con el JSON del backend
async function procesar(respuesta) {
  if (respuesta.status === 204) return null
  const datos = await respuesta.json()
  if (!respuesta.ok) {
    const error = new Error('La API respondió con el código ' + respuesta.status)
    error.status = respuesta.status
    error.datos = datos
    throw error
  }
  return datos
}

function enviar(ruta, metodo, cuerpo) {
  return fetch(API_URL + ruta, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  }).then(procesar)
}

// ---------- Especialidades ----------
export function getEspecialidades() {
  return fetch(API_URL + 'especialidades/').then(procesar)
}

// ---------- Médicos ----------
export function getMedicos(especialidadId = '') {
  const filtro = especialidadId ? `?especialidad=${especialidadId}` : ''
  return fetch(API_URL + 'medicos/' + filtro).then(procesar)
}

// ---------- Pacientes ----------
export function getPacientes() {
  return fetch(API_URL + 'pacientes/').then(procesar)
}

export function crearPaciente(paciente) {
  return enviar('pacientes/', 'POST', paciente)
}

export function eliminarPaciente(id) {
  return fetch(API_URL + `pacientes/${id}/`, { method: 'DELETE' }).then(procesar)
}

// ---------- Estados y citas ----------
export function getEstados() {
  return fetch(API_URL + 'estados/').then(procesar)
}

export function getCitas(fecha = '') {
  const filtro = fecha ? `?fecha=${fecha}` : ''
  return fetch(API_URL + 'citas/' + filtro).then(procesar)
}

export function crearCita(cita) {
  return enviar('citas/', 'POST', cita)
}

export function actualizarCita(id, cambios) {
  return enviar(`citas/${id}/`, 'PATCH', cambios)
}

// Convierte el JSON de error de DRF ({campo: [mensajes]}) en un texto legible
export function mensajeError(error) {
  if (!error.datos) return 'No se pudo conectar con el servidor.'
  return Object.values(error.datos).flat().join(' ')
}
