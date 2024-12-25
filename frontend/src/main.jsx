import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmployeeDashboard from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeDashboard />
  </StrictMode>,
)