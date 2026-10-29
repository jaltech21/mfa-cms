import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import AdminDashboard from '../features/admin/AdminDashboard'
import CatalogManager from '../features/admin/CatalogManager'
import ApplicationsManager from '../features/admin/ApplicationsManager'
import CohortsManager from '../features/admin/CohortsManager'
import ClientsManager from '../features/admin/ClientsManager'
import PaymentsManager from '../features/admin/PaymentsManager'

export default function AdminPortal() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header title="Operations & IT Management Portal" />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/catalog" element={<CatalogManager />} />
          <Route path="/applications" element={<ApplicationsManager />} />
          <Route path="/cohorts" element={<CohortsManager />} />
          <Route path="/clients" element={<ClientsManager />} />
          <Route path="/payments" element={<PaymentsManager />} />
        </Routes>
      </div>
    </div>
  )
}
