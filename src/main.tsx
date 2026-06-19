import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/App.tsx'

const redirectPath = new URLSearchParams(window.location.search).get('redirect')

if (redirectPath) {
  window.history.replaceState(null, '', redirectPath)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)