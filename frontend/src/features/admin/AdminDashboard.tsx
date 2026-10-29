import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <Card title="Catalog Management">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Manage visa processing programs and pricing</p>
          <Button onClick={() => navigate('/admin/catalog')}>Manage Catalog</Button>
        </Card>
        <Card title="Application Review">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Review and process client applications</p>
          <Button variant="success" onClick={() => navigate('/admin/applications')}>Review Applications</Button>
        </Card>
        <Card title="Cohort Management">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Manage delegations and groups</p>
          <Button variant="secondary" onClick={() => navigate('/admin/cohorts')}>Manage Cohorts</Button>
        </Card>
        <Card title="Client Management">
          <p style={{ marginBottom: '1rem', color: '#666' }}>View and manage all clients</p>
          <Button variant="secondary" onClick={() => navigate('/admin/clients')}>View Clients</Button>
        </Card>
        <Card title="Financial Ledger">
          <p style={{ marginBottom: '1rem', color: '#666' }}>Track payments and initiate programs</p>
          <Button variant="success" onClick={() => navigate('/admin/payments')}>Payments & Initiation</Button>
        </Card>
      </div>
    </div>
  )
}
