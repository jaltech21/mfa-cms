import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import api from '../../lib/api'

export default function ConsentSign() {
  const [terms, setTerms] = useState<any>(null)
  const [agreed, setAgreed] = useState(false)
  const [passport, setPassport] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/client/programs/terms/active').then(res => setTerms(res.data)).catch(console.error)
  }, [])

  const handleSign = async () => {
    if (!agreed) {
      alert('Please agree to the terms and conditions')
      return
    }
    try {
      await api.post('/client/programs/consent/sign', {
        terms_and_conditions_id: terms.id,
        passport_verification: passport,
        signature_data: 'canvas-signature-placeholder'
      })
      alert('Consent signed successfully!')
      navigate('/client')
    } catch (err) {
      alert('Failed to sign consent')
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/client')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <Card title="Terms & Conditions">
        {terms ? (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>{terms.title} (v{terms.version})</h3>
            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '4px', maxHeight: '300px', overflow: 'auto', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
              {terms.content}
            </div>
            <Input label="Passport Number for Verification" value={passport} onChange={(e) => setPassport(e.target.value)} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              I have read and agree to the Terms and Conditions
            </label>
            <Button onClick={handleSign}>Sign and Submit</Button>
          </div>
        ) : (
          <p>Loading terms...</p>
        )}
      </Card>
    </div>
  )
}
