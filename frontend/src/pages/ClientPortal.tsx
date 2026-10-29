import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import api from '../lib/api'
import ClientDashboard from '../features/client/ClientDashboard'
import IntakeForm from '../features/client/IntakeForm'
import CatalogView from '../features/client/CatalogView'
import ConsentSign from '../features/client/ConsentSign'
import MyPrograms from '../features/client/MyPrograms'

export default function ClientPortal() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header title="Client Portal - Migration For All" />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/catalog" element={<CatalogView />} />
          <Route path="/consent" element={<ConsentSign />} />
          <Route path="/programs" element={<MyPrograms />} />
        </Routes>
      </div>
    </div>
  )
}
