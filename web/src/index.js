import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css' // Make sure to include a basic CSS file for styling

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
