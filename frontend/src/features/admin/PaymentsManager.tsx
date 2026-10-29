import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

export default function PaymentsManager() {
  const [payments, setPayments] = useState<any[]>([])
  const [apps, setApps] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    api.get('/admin/payments').then(res => setPayments(res.data)).catch(console.error)
    api.get('/admin/applications').then(res => setApps(res.data)).catch(console.error)
  }

  const initiateProgram = async (programId: number) => {
    try {
      await api.put(`/admin/payments/1/initiate/${programId}`)
      alert('Program initiated successfully! Client can now access document tracking.')
      loadData()
    } catch (err) {
      alert('Failed to initiate')
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <h1 style={{ marginBottom: '2rem' }}>Financial Ledger & Program Initiation</h1>
      
      <h2 style={{ marginBottom: '1rem' }}>Programs Pending Initiation</h2>
      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        {apps.filter(a => a.status === 'pending_initiation' && !a.is_initiated).map((app) => (
          <Card key={app.id} title={`Application #${app.id}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Proposed Budget:</strong> ${app.proposed_budget}</p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
              <Button variant="success" onClick={() => initiateProgram(app.id)}>Initiate Program</Button>
            </div>
          </Card>
        ))}
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Payment Records</h2>
      <Card>
        <p style={{ color: '#666' }}>No payments recorded yet.</p>
      </Card>
    </div>
  )
}
