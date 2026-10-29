import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/auth/me').then(res => {
      setUser(res.data)
    }).catch(() => {
      navigate('/login')
    })
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MFA CMS Dashboard</h1>
      <p>Welcome, {user.first_name} {user.last_name}</p>
      <p>Role: {user.role}</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        {user.role === 'client' && <button onClick={() => navigate('/client')}>Client Portal</button>}
        {(user.role === 'super_admin' || user.role === 'operations_manager') && <button onClick={() => navigate('/admin')}>Admin Portal</button>}
      </div>
    </div>
  )
}
