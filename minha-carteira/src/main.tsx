import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {ThemeProvider} from './hooks/theme'
import { AuthProvider } from './hooks/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
