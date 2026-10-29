import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ClientPortal from './pages/ClientPortal'
import AdminPortal from './pages/AdminPortal'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client/*" element={<ClientPortal />} />
      <Route path="/admin/*" element={<AdminPortal />} />
    </Routes>
  )
}

export default App
