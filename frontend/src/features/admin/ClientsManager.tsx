import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

export default function ClientsManager() {
  const [clients, setClients] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/admin/clients').then(res => setClients(res.data)).catch(console.error)
  }, [])

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <h1 style={{ marginBottom: '2rem' }}>Client Management</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {clients.map((client) => (
          <Card key={client.id} title={`${client.first_name} ${client.last_name}`}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Role:</strong> {client.role}</p>
              <p><strong>Status:</strong> {client.is_active ? 'Active' : 'Inactive'}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
