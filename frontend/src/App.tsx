import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ClientPortal from './pages/ClientPortal'
import AdminPortal from './pages/AdminPortal'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client/*" element={<ClientPortal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

      <Route path="/admin/*" element={<AdminPortal />} />
    </Routes>
  )
}

export default App
