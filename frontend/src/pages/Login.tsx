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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <Card title="Migration For All - CMS Login">
          <p style={{ marginBottom: '1.5rem', color: '#666', textAlign: 'center' }}>
            Sign in to access your account
          </p>
          <form onSubmit={handleLogin}>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', bottom: '35px', background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', fontSize: '0.875rem' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error && (
              <div style={{ padding: '0.75rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}
            <Button type="submit" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/login/forgot-password')}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Forgot Password?
            </button>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', fontSize: '0.875rem' }}>
            <strong>Demo Credentials:</strong><br />
            Admin: admin@mfa.com / admin123<br />
            Client: client2@test.com / pass123
          </div>
        </Card>
      </div>
    </div>
  )
}
