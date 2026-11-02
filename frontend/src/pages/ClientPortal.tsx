import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import ClientDashboard from '../features/client/ClientDashboard'
import IntakeForm from '../features/client/IntakeForm'
import CatalogView from '../features/client/CatalogView'
import ConsentSign from '../features/client/ConsentSign'
import MyPrograms from '../features/client/MyPrograms'
import ClientLanding from '../pages/ClientLanding'
import { getToken } from '../utils/auth'
import api from '../lib/api'

export default function ClientPortal() {
  const navigate = useNavigate()
  const token = getToken()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!token) {
      setChecking(false)
      return
    }
    api.get('/auth/me')
      .then((res) => {
        setUser(res.data)
        if (res.data?.role && res.data.role !== 'client') {
          navigate('/admin', { replace: true })
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

  const isStaff = !!(user && user.role && user.role !== 'client')

  if (isStaff) {
    return null
  }

  // Unauthenticated visitors see the public client landing page (register + login)
  if (!token) {
    return <ClientLanding />
  }

  // Authenticated client session
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header title="Client Portal - Migration For All" logoutPath="/client" />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<ClientHome />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/catalog" element={<CatalogView />} />
          <Route path="/consent" element={<ConsentSign />} />
          <Route path="/programs" element={<MyPrograms />} />
        </Routes>
      </div>
    </div>
  )
}

function ClientHome() {
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
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setChecking(false)
      })
  }, [token, navigate])

  useEffect(() => {
    if (checking) return
    if (token && user) {
      if (user.role && user.role !== 'client') {
        navigate('/admin', { replace: true })
      } else if (user.role === 'client') {
        navigate('/client/dashboard', { replace: true })
      }
    }
  }, [checking, token, user, navigate])

  if (checking) {
    return <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
  }
  if (!token || !user) return null
  if (user.role === 'client') return null

  return <ClientLanding />
}
