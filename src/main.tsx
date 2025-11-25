import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { KeycloakProvider } from './providers/KeycloakProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KeycloakProvider>
      <App />
    </KeycloakProvider>
  </StrictMode>,
)
