import { useState, useEffect } from 'react'

const toastStyles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  toast: (type) => ({
    padding: '12px 18px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '260px',
    maxWidth: '360px',
    animation: 'slideIn 0.3s ease',
    background: type === 'success' ? '#0d2d20' : type === 'error' ? '#2d0d0d' : '#0d1a2d',
    border: `1.5px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'}`,
    color: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }),
  icon: (type) => ({
    fontSize: '18px',
    flexShrink: 0,
  })
}

const icons = { success: '✓', error: '✕', info: 'ℹ' }

let toastFn = null

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    toastFn = (msg, type = 'info') => {
      const id = Date.now()
      setToasts(p => [...p, { id, msg, type }])
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
    }
    return () => { toastFn = null }
  }, [])

  return (
    <div style={toastStyles.container}>
      {toasts.map(t => (
        <div key={t.id} style={toastStyles.toast(t.type)}>
          <span style={toastStyles.icon(t.type)}>{icons[t.type]}</span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export const toast = {
  success: (msg) => toastFn?.(msg, 'success'),
  error: (msg) => toastFn?.(msg, 'error'),
  info: (msg) => toastFn?.(msg, 'info'),
}
