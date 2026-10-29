import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function IntakeForm() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    address: '',
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      alert('Application submitted successfully!')
      navigate('/client')
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/client')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <Card title={`Intake Form - Step ${step} of 3`}>
        {step === 1 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Personal Information</h4>
            <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            <Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Travel Information</h4>
            <Input label="Nationality" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} />
            <Input label="Passport Number" value={formData.passportNumber} onChange={(e) => setFormData({...formData, passportNumber: e.target.value})} />
          </div>
        )}
        {step === 3 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact Details</h4>
            <Input label="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {step > 1 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Previous</Button>}
          <Button onClick={handleNext}>{step === 3 ? 'Submit' : 'Next'}</Button>
        </div>
      </Card>
    </div>
  )
}
