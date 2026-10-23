import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { ServiciosProvider } from './context/ServiciosContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServiciosProvider>
      <App />
    </ServiciosProvider>
  </React.StrictMode>
)