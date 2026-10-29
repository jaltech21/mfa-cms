import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

export default function ApplicationsManager() {
  const [apps, setApps] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    loadApps()
  }, [])

  const loadApps = () => {
    api.get('/admin/applications').then(res => setApps(res.data)).catch(console.error)
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admin/applications/${id}/status?new_status=${status}`)
      alert('Status updated')
      loadApps()
    } catch (err) {
      alert('Failed to update')
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <h1 style={{ marginBottom: '2rem' }}>Application Review Queue</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {apps.map((app) => (
          <Card key={app.id} title={`Application #${app.id}`}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Budget:</strong> ${app.proposed_budget}</p>
              <p><strong>Initiated:</strong> {app.is_initiated ? 'Yes' : 'No'}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button variant="success" onClick={() => updateStatus(app.id, 'under_review')}>Mark Under Review</Button>
              <Button onClick={() => updateStatus(app.id, 'pending_initiation')}>Pending Initiation</Button>
              <Button variant="danger" onClick={() => updateStatus(app.id, 'rejected')}>Reject</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
