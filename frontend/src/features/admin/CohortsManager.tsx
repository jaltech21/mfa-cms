import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import api from '../../lib/api'

export default function CohortsManager() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', cohort_type: 'family', description: '' })
  const navigate = useNavigate()

  useEffect(() => {
    loadCohorts()
  }, [])

  const loadCohorts = () => {
    api.get('/admin/cohorts').then(res => setCohorts(res.data)).catch(console.error)
  }

  const handleCreate = async () => {
    try {
      await api.post('/admin/cohorts', form)
      alert('Cohort created')
      setShowForm(false)
      loadCohorts()
    } catch (err) {
      alert('Failed to create')
    }
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Cohort Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Create Cohort'}</Button>
      </div>

      {showForm && (
        <Card title="Create Cohort" style={{ marginBottom: '1.5rem' }}>
          <Input label="Cohort Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          <select value={form.cohort_type} onChange={(e) => setForm({...form, cohort_type: e.target.value})} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
            <option value="family">Family</option>
            <option value="delegation">Delegation</option>
            <option value="envoy">Envoy</option>
            <option value="other">Other</option>
          </select>
          <Input label="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
          <Button onClick={handleCreate}>Create</Button>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {cohorts.map((cohort) => (
          <Card key={cohort.id} title={cohort.name}>
            <p><strong>Type:</strong> {cohort.cohort_type}</p>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>{cohort.description}</p>
            <p style={{ marginTop: '0.5rem' }}><strong>Status:</strong> {cohort.is_active ? 'Active' : 'Inactive'}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
