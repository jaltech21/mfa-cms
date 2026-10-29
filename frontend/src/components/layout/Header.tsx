import { useNavigate } from 'react-router-dom'

export default function Header({ title }: { title: string }) {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
    <header style={{
      background: '#007bff',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h2>{title}</h2>
      <button onClick={logout} style={{ background: 'white', color: '#007bff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
        Logout
      </button>
    </header>
  )
}
