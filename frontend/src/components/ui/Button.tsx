import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
}

export default function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
  const variants = {
    primary: { background: '#007bff', color: 'white' },
    secondary: { background: '#6c757d', color: 'white' },
    success: { background: '#28a745', color: 'white' },
    danger: { background: '#dc3545', color: 'white' },
  }
  
  return (
    <button
      {...props}
      style={{
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  )
}
