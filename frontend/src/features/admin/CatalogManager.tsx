import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'

export default function CatalogManager() {
  const [catalog, setCatalog] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ program_type: 'marriage', name: '', description: '', standard_price: '', requirements: '', is_active: true })
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    loadCatalog()
  }, [])

  const loadCatalog = () => {
    api.get('/admin/catalog').then(res => setCatalog(res.data)).catch(console.error)
  }

  const startCreate = () => {
    setEditingId(null)
    setForm({ program_type: 'marriage', name: '', description: '', standard_price: '', requirements: '', is_active: true })
    setShowForm(true)
  }

  const startEdit = (item: any) => {
    setEditingId(item.id)
    setForm({
      program_type: item.program_type,
      name: item.name,
      description: item.description || '',
      standard_price: String(item.standard_price),
      requirements: item.requirements || '',
      is_active: item.is_active,
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm({ program_type: 'marriage', name: '', description: '', standard_price: '', requirements: '', is_active: true })
  }

  const handleCreate = async () => {
    try {
      await api.post('/admin/catalog', {...form, standard_price: parseFloat(form.standard_price)})
      closeForm()
      showToast('success', 'Catalog item created successfully')
      loadCatalog()
    } catch (err: any) {
      showToast('error', err.response?.data?.detail || 'Failed to create catalog item')
    }
  }

  const handleUpdate = async () => {
    if (!editingId) return
    try {
      await api.put(`/admin/catalog/${editingId}`, {
        ...form,
        standard_price: parseFloat(form.standard_price),
        is_active: form.is_active,
      })
      closeForm()
      showToast('success', 'Catalog item updated successfully')
      loadCatalog()
    } catch (err: any) {
      showToast('error', err.response?.data?.detail || 'Failed to update catalog item')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this catalog item?')) return
    try {
      await api.delete(`/admin/catalog/${id}`)
      showToast('success', 'Catalog item deleted successfully')
      loadCatalog()
    } catch (err: any) {
      showToast('error', err.response?.data?.detail || 'Failed to delete catalog item')
    }
  }

  const formContent = (
    <Card title={editingId ? 'Edit Catalog Item' : 'Add Catalog Item'} style={{ marginBottom: '1.5rem' }}>
      <select value={form.program_type} onChange={(e) => setForm({...form, program_type: e.target.value})} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}>
        <option value="marriage">Marriage</option>
        <option value="business">Business</option>
        <option value="ministry_envoy">Ministry Envoy</option>
        <option value="medical">Medical</option>
      </select>
      <Input label="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
      <Input label="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
      <Input label="Price (USD)" type="number" value={form.standard_price} onChange={(e) => setForm({...form, standard_price: e.target.value})} />
      <Input label="Requirements" value={form.requirements} onChange={(e) => setForm({...form, requirements: e.target.value})} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
        <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} />
        Active
      </label>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {editingId ? (
          <Button onClick={handleUpdate}>Update</Button>
        ) : (
          <Button onClick={handleCreate}>Create</Button>
        )}
        <Button variant="secondary" onClick={() => closeForm()}>Cancel</Button>
      </div>
    </Card>
  )

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>← Back to Dashboard</Button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Catalog Management</h1>
        <Button onClick={startCreate}>{editingId ? 'Edit Catalog Item' : 'Add New Item'}</Button>
      </div>

      {showForm && formContent}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {catalog.map((item) => (
          <Card key={item.id} title={item.name}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <p><strong>Type:</strong> {item.program_type}</p>
              <p><strong>Price:</strong> {item.currency} {item.standard_price}</p>
              <p><strong>Status:</strong> {item.is_active ? 'Active' : 'Inactive'}</p>
            </div>
            <p style={{ marginTop: '0.5rem', color: '#666' }}>{item.description}</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => startEdit(item)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
