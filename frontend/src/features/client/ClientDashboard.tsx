import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function ClientDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card title="Start Application">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Begin your migration application process</p>
          <Button onClick={() => navigate('/client/intake')}>Start Intake Form</Button>
        </Card>
        <Card title="Browse Programs">
          <p style={{ marginBottom: '1rem', color: '#666' }}>View available visa programs and pricing</p>
          <Button variant="secondary" onClick={() => navigate('/client/catalog')}>View Catalog</Button>
        </Card>
        <Card title="My Applications">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Track your submitted applications</p>
          <Button variant="success" onClick={() => navigate('/client/programs')}>View My Programs</Button>
        </Card>
        <Card title="Legal Consent">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Review and sign terms & conditions</p>
          <Button variant="secondary" onClick={() => navigate('/client/consent')}>Sign Consent</Button>
        </Card>
      </div>
    </div>
  )
}
