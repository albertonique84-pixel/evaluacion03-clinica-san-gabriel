import { createContext, useContext, useState } from 'react'

// Datos que comparten varios componentes sin pasarlos por props
const ClinicaContext = createContext(null)

export const RECEPCIONISTAS = ['Milagros Castillo Reyes', 'Rosa Huamán Torres', 'Kevin Salas Ortiz']

function hoy() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function ClinicaProvider({ children }) {
  const [recepcionista, setRecepcionista] = useState(RECEPCIONISTAS[0])
  const [fechaTrabajo, setFechaTrabajo] = useState(hoy())

  const valor = { recepcionista, setRecepcionista, fechaTrabajo, setFechaTrabajo }

  return <ClinicaContext.Provider value={valor}>{children}</ClinicaContext.Provider>
}

// Hook para leer el contexto con useContext
export function useClinica() {
  return useContext(ClinicaContext)
}
