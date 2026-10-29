import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

export default function CatalogView() {
  const [catalog, setCatalog] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/client/catalog').then(res => setCatalog(res.data)).catch(console.error)
  }, [])

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/client')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <h1 style={{ marginBottom: '2rem' }}>Available Programs</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {catalog.map((item) => (
          <Card key={item.id} title={item.name}>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}><strong>Type:</strong> {item.program_type}</p>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}><strong>Price:</strong> {item.currency} {item.standard_price}</p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{item.description}</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}><strong>Requirements:</strong> {item.requirements}</p>
            <Button onClick={() => navigate('/client/programs')}>Apply for This Program</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
