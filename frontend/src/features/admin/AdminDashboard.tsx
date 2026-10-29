import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const modules = [
  {
    title: 'Catalog Management',
    description: 'Manage visa processing programs, pricing, and requirements.',
    action: '/admin/catalog',
    label: 'Manage Catalog',
    icon: '📋',
    variant: 'primary' as const,
  },
  {
    title: 'Application Review',
    description: 'Review and process incoming client applications.',
    action: '/admin/applications',
    label: 'Review Applications',
    icon: '📄',
    variant: 'success' as const,
  },
  {
    title: 'Cohort Management',
    description: 'Manage delegations, families, and envoy groups.',
    action: '/admin/cohorts',
    label: 'Manage Cohorts',
    icon: '👥',
    variant: 'secondary' as const,
  },
  {
    title: 'Client Management',
    description: 'View and manage all client records.',
    action: '/admin/clients',
    label: 'View Clients',
    icon: '🧑‍💼',
    variant: 'secondary' as const,
  },
  {
    title: 'Financial Ledger',
    description: 'Track payments and initiate visa programs.',
    action: '/admin/payments',
    label: 'Payments & Initiation',
    icon: '💳',
    variant: 'success' as const,
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', borderRadius: '16px', padding: '3.5rem 2.5rem', color: 'white', marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>Operations &amp; IT Management</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '640px', margin: '0 auto 2rem' }}>
          Unified dashboard for client operations, application review, financial tracking, and system administration.
        </p>
        <Button
          onClick={() => navigate('/admin/applications')}
          style={{ background: 'white', color: '#1e40af', padding: '0.875rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 700 }}
        >
          Open Application Queue
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {modules.map((module) => (
          <Card key={module.title} title={module.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{module.icon}</span>
              <p style={{ color: '#6b7280', flex: 1, margin: 0 }}>{module.description}</p>
            </div>
            <Button variant={module.variant} onClick={() => navigate(module.action)}>
              {module.label}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
