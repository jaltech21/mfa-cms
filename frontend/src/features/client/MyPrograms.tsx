import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

export default function MyPrograms() {
  const [programs, setPrograms] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/client/programs/my-programs').then(res => setPrograms(res.data)).catch(console.error)
  }, [])

  const getStatusColor = (status: string) => {
    if (status === 'initiated' || status === 'in_progress') return '#28a745'
    if (status === 'submitted' || status === 'under_review') return '#ffc107'
    if (status === 'rejected') return '#dc3545'
    return '#6c757d'
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/client')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <h1 style={{ marginBottom: '2rem' }}>My Applications</h1>
      {programs.length === 0 ? (
        <Card>
          <p style={{ color: '#666' }}>You haven't submitted any applications yet.</p>
          <Button onClick={() => navigate('/client/catalog')} style={{ marginTop: '1rem' }}>Browse Programs</Button>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {programs.map((program) => (
            <Card key={program.id} title={`Application #${program.id}`}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <p><strong>Status:</strong> <span style={{ color: getStatusColor(program.status) }}>{program.status}</span></p>
                <p><strong>Initiated:</strong> {program.is_initiated ? 'Yes' : 'No'}</p>
                <p><strong>Proposed Budget:</strong> ${program.proposed_budget}</p>
                <p><strong>Submitted:</strong> {new Date(program.created_at).toLocaleDateString()}</p>
              </div>
              {!program.is_initiated && (
                <p style={{ marginTop: '1rem', padding: '0.5rem', background: '#fff3cd', borderRadius: '4px', color: '#856404' }}>
                  Document tracking will be unlocked once initiated by the Operations team.
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
