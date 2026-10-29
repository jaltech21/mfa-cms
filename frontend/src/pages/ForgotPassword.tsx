import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../lib/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!email) {
      setError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      const res = await api.post('/auth/forgot-password', { email })
      setMessage(res.data.message)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to process request')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <Card title="Forgot Password">
          <p style={{ marginBottom: '1.5rem', color: '#666', textAlign: 'center' }}>
            Enter your email to receive a password reset link
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div style={{ padding: '0.75rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            {message && <div style={{ padding: '0.75rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}
            <Button type="submit" style={{ width: '100%' }}>Send Reset Link</Button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
              Back to Login
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
