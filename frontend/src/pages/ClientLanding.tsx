import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useToast } from '../components/ui/Toast'
import api from '../lib/api'

const inputStyle: any = { width: '100%', padding: '0.75rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }

const errorBox: any = { padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }

const submitButtonStyle: any = { width: '100%', padding: '0.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(135deg, #1e40af, #7c3aed)', border: 'none', color: 'white', cursor: 'pointer', opacity: 1 }

export default function ClientLanding() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegError('')

    if (!firstName.trim()) { setRegError('First name is required'); return }
    if (!lastName.trim()) { setRegError('Last name is required'); return }
    if (!username.trim() || username.trim().length < 3) { setRegError('Username must be at least 3 characters'); return }
    if (!email) { setRegError('Email address is required'); return }
    if (!validateEmail(email)) { setRegError('Please enter a valid email address'); return }
    if (!password) { setRegError('Password is required'); return }
    if (password.length < 6) { setRegError('Password must be at least 6 characters'); return }

    setRegLoading(true)
    try {
      await api.post('/auth/register', {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      })
      showToast('success', 'Your account has been created successfully. Please sign in.')
      navigate('/client')
    } catch (err: any) {
      setRegError(err.response?.data?.detail || 'Failed to create your account. Please try again.')
    } finally {
      setRegLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    const identifier = loginEmail.trim()
    if (!identifier) { setLoginError('Email or username is required'); return }
    if (!validateEmail(identifier)) { setLoginError('Please enter a valid email address'); return }
    if (!loginPassword) { setLoginError('Password is required'); return }
    if (loginPassword.length < 6) { setLoginError('Password must be at least 6 characters'); return }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('username', identifier)
      formData.append('password', loginPassword)
      const res = await api.post('/auth/login', formData)
      localStorage.setItem('token', res.data.access_token)
      const me = await api.get('/auth/me')
      const role = me.data?.role
      if (role === 'client') {
        navigate('/client/dashboard')
      } else {
        navigate('/admin')
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.detail || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const heroContent = (
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: 'linear-gradient(135deg, #1e40af, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '2rem', color: 'white', fontWeight: 700 }}>
        MFA
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Migration For All</h1>
      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.125rem' }}>Client Portal</p>
      <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.75rem auto 0', maxWidth: '560px', fontSize: '0.95rem' }}>
        Register for the portal or sign in to continue your migration journey with secure, guided support.
      </p>
    </div>
  )

  const modeSwitcher = (
    <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.12)', padding: '0.25rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
      <button
        type="button"
        onClick={() => setMode('login')}
        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', background: mode === 'login' ? 'white' : 'transparent', color: mode === 'login' ? '#1e40af' : 'rgba(255,255,255,0.85)' }}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => setMode('register')}
        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', background: mode === 'register' ? 'white' : 'transparent', color: mode === 'register' ? '#1e40af' : 'rgba(255,255,255,0.85)' }}
      >
        Create Account
      </button>
    </div>
  )

  const loginCard = (
    <Card title="Welcome Back" style={{ padding: '2rem', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Sign in to access your client portal dashboard.</p>
      <form onSubmit={handleLogin}>
        <Input
          label="Email or Username"
          type="email"
          placeholder="Enter your email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          disabled={loading}
          style={{ ...inputStyle, marginBottom: '1rem' }}
        />
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            disabled={loading}
            style={{ ...inputStyle, marginBottom: '0.5rem' }}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '0.8rem', fontWeight: 600 }}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {loginError && <div style={errorBox}>{loginError}</div>}
        <Button type="submit" style={{ ...submitButtonStyle, background: 'linear-gradient(135deg, #1e40af, #7c3aed)', border: 'none', color: 'white' }} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => navigate('/login/forgot-password')}
          style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Forgot Password?
        </button>
        <span style={{ color: '#9ca3af' }}> · </span>
        <button type="button" onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
          Create an account
        </button>
      </div>
    </Card>
  )

  const registerCard = (
    <Card title="Create Client Account" style={{ padding: '2rem', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Fill in your details to register for the client portal.</p>
      <form onSubmit={handleRegister}>
        <Input label="First Name" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={regLoading} style={{ ...inputStyle, marginBottom: '1rem' }} />
        <Input label="Last Name" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={regLoading} style={{ ...inputStyle, marginBottom: '1rem' }} />
        <Input label="Username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={regLoading} style={{ ...inputStyle, marginBottom: '1rem' }} />
        <Input label="Email Address" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={regLoading} style={{ ...inputStyle, marginBottom: '1rem' }} />
        <Input label="Password" type="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={regLoading} style={{ ...inputStyle, marginBottom: '1.25rem' }} />
        {regError && <div style={errorBox}>{regError}</div>}
        <Button type="submit" disabled={regLoading} style={submitButtonStyle}>
          {regLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Already have an account? </span>
        <button type="button" onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
          Sign in
        </button>
      </div>
    </Card>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%)', padding: '3rem 1rem 4rem' }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}>
        {heroContent}
        {modeSwitcher}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {mode === 'login' ? loginCard : registerCard}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '2rem' }}>
          © 2026 Migration For All (MFA). All rights reserved.
        </p>
      </div>
    </div>
  )
}
