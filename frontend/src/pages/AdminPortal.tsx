import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import AdminDashboard from '../features/admin/AdminDashboard'
import CatalogManager from '../features/admin/CatalogManager'
import ApplicationsManager from '../features/admin/ApplicationsManager'
import CohortsManager from '../features/admin/CohortsManager'
import ClientsManager from '../features/admin/ClientsManager'
import PaymentsManager from '../features/admin/PaymentsManager'
import { getToken } from '../utils/auth'
import api from '../lib/api'

export default function AdminPortal() {
  const navigate = useNavigate()
  const token = getToken()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }
    api.get('/auth/me')
      .then((res) => {
        setUser(res.data)
        if (res.data?.role && res.data.role !== 'client') {
          // staff session
        } else if (res.data?.role === 'client') {
          navigate('/client/dashboard', { replace: true })
        }
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setChecking(false)
      })
  }, [token, navigate])

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Loading...</div>
          <div>Authenticating your session</div>
        </div>
      </div>
    )
  }

  if (!token || !user || user.role === 'client') {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header title="Operations & IT Management Portal" />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/catalog" element={<CatalogManager />} />
          <Route path="/applications" element={<ApplicationsManager />} />
          <Route path="/cohorts" element={<CohortsManager />} />
          <Route path="/clients" element={<ClientsManager />} />
          <Route path="/payments" element={<PaymentsManager />} />
        </Routes>
      </div>
    </div>
  )
}
