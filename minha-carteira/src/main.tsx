import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {ThemeProvider} from './hooks/theme'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
