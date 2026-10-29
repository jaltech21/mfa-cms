import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!password) {
      setError('Password is required')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)
      const res = await api.post('/auth/login', formData)
      localStorage.setItem('token', res.data.access_token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: any = { width: '100%', padding: '0.75rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <Card title="" style={{ padding: '2rem', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #1e40af, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.75rem', color: 'white', fontWeight: '700' }}>
              MFA
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Migration For All</h1>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Client & Casework Management System</p>
          </div>
          <form onSubmit={handleLogin}>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{ ...inputStyle, marginBottom: '1rem' }}
            />
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ ...inputStyle, marginBottom: '0.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '0.8rem', fontWeight: 600 }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error && (
              <div style={{ padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <Button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(135deg, #1e40af, #7c3aed)', border: 'none', color: 'white', cursor: 'pointer', opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/login/forgot-password')}
              style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
            >
              Forgot Password?
            </button>
          </div>
        </Card>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          © 2026 Migration For All (MFA). All rights reserved.
        </p>
      </div>
    </div>
  )
}
