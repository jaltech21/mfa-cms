import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function ClientDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Start Application',
      description: 'Begin your migration intake process with our guided multi-step form.',
      action: '/client/intake',
      label: 'Start Intake',
      variant: 'primary' as const,
    },
    {
      title: 'Browse Programs',
      description: 'Explore available visa programs, pricing, and requirements.',
      action: '/client/catalog',
      label: 'View Catalog',
      variant: 'secondary' as const,
    },
    {
      title: 'My Applications',
      description: 'Track your submitted applications and their live status.',
      action: '/client/programs',
      label: 'View My Programs',
      variant: 'success' as const,
    },
    {
      title: 'Legal Consent',
      description: 'Review and sign the latest Terms & Conditions before proceeding.',
      action: '/client/consent',
      label: 'Sign Consent',
      variant: 'secondary' as const,
    },
  ]

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', borderRadius: '16px', padding: '3.5rem 2.5rem', color: 'white', marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>Your Migration Journey, Simplified</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '640px', margin: '0 auto 2rem' }}>
          Secure, guided visa application management with transparent tracking and professional support.
        </p>
        <Button
          onClick={() => navigate('/client/intake')}
          style={{ background: 'white', color: '#1e40af', padding: '0.875rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 700 }}
        >
          Start Your Application
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {features.map((feature) => (
          <Card key={feature.title} title={feature.title}>
            <p style={{ color: '#6b7280', marginBottom: '1.25rem', minHeight: '60px' }}>{feature.description}</p>
            <Button variant={feature.variant} onClick={() => navigate(feature.action)}>
              {feature.label}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
