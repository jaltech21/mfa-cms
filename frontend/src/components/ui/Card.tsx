import { ReactNode } from 'react'

export default function Card({ children, title, style }: { children: ReactNode, title?: string, style?: any }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      ...style,
    }}>
      {title && <h3 style={{ marginBottom: '1rem', color: '#333' }}>{title}</h3>}
      {children}
    </div>
  )
}
