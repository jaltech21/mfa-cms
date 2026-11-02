import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const features = [
  {
    title: 'Guided Intakes',
    description: 'Structured multi-step application intake that captures personal, travel, and contact details with ease.',
  },
  {
    title: 'Program Catalog',
    description: 'Transparent pricing and requirements for every migration program, managed in one place.',
  },
  {
    title: 'Document Tracking',
    description: 'Real-time tracking of applications, consents, and program status from submission to completion.',
  },
  {
    title: 'Secure Payments',
    description: 'Managed payment initiation and cohort-based casework workflows built for accountability.',
  },
]

function FeatureIcon({ index }: { index: number }) {
  const icons = [
    <path key="i" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />,
    <rect key="r" x="8" y="2" width="8" height="4" rx="1" />,
    <path key="l1" d="M3 12h18" />,
    <path key="l2" d="M3 18h18" />,
    <path key="l3" d="M9 6h.01" />,
    <path key="l4" d="M9 12h.01" />,
    <path key="l5" d="M9 18h.01" />,
  ]
  const files = [
    <path key="f1" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />,
    <path key="f2" d="M14 2v4a2 2 0 0 0 2 2h4" />,
  ]
  const lock = [<rect key="r" x="3" y="11" width="18" height="11" rx="2" />, <path key="p" d="M7 11V7a5 5 0 0 1 10 0v4" />]
  const iconsArray = [icons, files, lock]
  const paths = iconsArray[index % iconsArray.length]
  return (
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {paths}
      </svg>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  const ctaButtonStyle: any = { background: 'white', color: '#1e40af', padding: '0.875rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }

  const secondaryButtonStyle: any = { background: 'rgba(255,255,255,0.12)', color: 'white', padding: '0.875rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer', backdropFilter: 'blur(6px)' }

  const sectionTitleStyle: any = { fontSize: '2rem', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '0.5rem' }

  const sectionSubtitleStyle: any = { color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1rem' }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', padding: '4rem 1rem 5rem', position: 'relative', overflow: 'hidden' }}>
      {/* decorative glows */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-250px', left: '-250px', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Client &amp; Casework Management
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem', lineHeight: 1.12, textShadow: '0 10px 40px rgba(0,0,0,0.35)' }}>Migration For All</h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.3rem', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Secure, guided migration and casework support for individuals and families — from first intake to final journey.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontSize: '0.98rem' }}>
            MFA brings structure and clarity to complex migration cases through professional intake, transparent program
            catalogs, document tracking, consent management, and secure payment workflows.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/client')} style={ctaButtonStyle}>Start Your Migration</Button>
            <Button onClick={() => navigate('/login')} style={secondaryButtonStyle}>Sign In</Button>
          </div>
        </div>

        {/* About / Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <Card title="Who We Are" style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '18px', padding: '2rem', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #1e40af, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>MFA</div>
              <div>
                <h3 style={{ margin: 0, color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>Migration For All</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.85rem' }}>Client &amp; Casework Management</p>
              </div>
            </div>
            <p style={{ color: '#4b5563', lineHeight: 1.75, fontSize: '0.95rem' }}>
              We are a purpose-built platform helping people and families navigate migration journeys with confidence.
              Every case is supported by structured processes, professional oversight, and compassionate guidance.
            </p>
          </Card>
          <Card title="Our Mission" style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '18px', padding: '2rem', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #059669, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.4rem', marginBottom: '1.25rem' }}>🎯</div>
            <h3 style={{ margin: '0 0 0.75rem', color: '#111827', fontSize: '1.25rem', fontWeight: 700 }}>Our Mission</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.75, fontSize: '0.95rem' }}>
              To make migration support simple, organized, and human. We combine professional casework with modern
              technology so every client can move forward with clarity and confidence.
            </p>
          </Card>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={sectionTitleStyle}>Comprehensive Support</h2>
          <p style={sectionSubtitleStyle}>Everything you need to manage migration cases with care and precision.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature, index) => (
              <Card key={feature.title}>
                <FeatureIcon index={index} />
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>{feature.title}</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.65 }}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(30,64,175,0.95), rgba(124,58,237,0.95))', borderRadius: '20px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Begin Your Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Create your client account or sign in to access guided intake, program catalog, and case tracking.
          </p>
          <Button onClick={() => navigate('/client')} style={ctaButtonStyle}>Get Started</Button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', marginTop: '2rem' }}>
          © 2026 Migration For All (MFA). All rights reserved.
        </p>
      </div>
    </div>
  )
}
