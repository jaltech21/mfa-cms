import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const features = [
  {
    title: 'Guided Intakes',
    description: 'Structured multi-step application intake capturing personal, travel, and contact details.',
  },
  {
    title: 'Program Catalog',
    description: 'Transparent pricing and requirements for every migration program we manage.',
  },
  {
    title: 'Document Tracking',
    description: 'Real-time tracking of applications, consents, and program status.',
  },
  {
    title: 'Secure Payments',
    description: 'Managed payment initiation and cohort-based case workflows.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  const ctaButtonStyle: any = { background: 'white', color: '#1e40af', padding: '0.875rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer' }

  const secondaryButtonStyle: any = { background: 'rgba(255,255,255,0.12)', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer' }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', padding: '3rem 1rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'linear-gradient(135deg, #1e40af, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', color: 'white', fontWeight: 800 }}>
            MFA
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.15 }}>Migration For All</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', maxWidth: '680px', margin: '0 auto 2rem' }}>
            A secure, professional client &amp; casework management system for modern migration journeys.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/client')} style={ctaButtonStyle}>Start Your Migration</Button>
            <Button onClick={() => navigate('/login')} style={secondaryButtonStyle}>Sign In</Button>
          </div>
        </div>

        {/* Basic organization info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <Card title="Who We Are" style={{ background: 'rgba(255,255,255,0.96)', borderRadius: '16px', padding: '2rem' }}>
            <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Migration For All (MFA) is a client and casework management platform built to support individuals and families
              through their migration and visa application journeys with structured intake, transparent program catalogs,
              document tracking, consent management, and secure payment workflows.
            </p>
          </Card>
          <Card title="Our Mission" style={{ background: 'rgba(255,255,255,0.96)', borderRadius: '16px', padding: '2rem' }}>
            <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '0.95rem' }}>
              To make migration support simple, organized, and human. We combine compassionate casework with modern
              technology so every client can move forward with confidence.
            </p>
          </Card>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>What We Do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature) => (
              <Card key={feature.title} title={feature.title}>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '2.5rem 2rem' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Begin Your Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>Create your client account or sign in to continue.</p>
          <Button onClick={() => navigate('/client')} style={{ ...ctaButtonStyle }}>Get Started</Button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '2rem' }}>
          © 2026 Migration For All (MFA). All rights reserved.
        </p>
      </div>
    </div>
  )
}
