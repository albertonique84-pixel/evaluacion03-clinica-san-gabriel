import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClinicaProvider } from './context/ClinicaContext.jsx'

// createRoot crea la raíz de React sobre el <div id="root"> de index.html;
// desde ahí React compara su DOM virtual y solo actualiza lo que cambia.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClinicaProvider>
      <App />
    </ClinicaProvider>
  </StrictMode>,
)
