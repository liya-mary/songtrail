import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/fonts/fonts.css';
import App from './App.js'
import "leaflet/dist/leaflet.css"
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
