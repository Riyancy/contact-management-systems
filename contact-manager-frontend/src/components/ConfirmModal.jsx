const overlayStyle = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  animation: 'fadeIn 0.2s ease',
}

const modalStyle = {
  background: 'var(--card)',
  border: '1.5px solid var(--card-border)',
  borderRadius: 'var(--radius-lg)',
  padding: '32px',
  width: '100%', maxWidth: '400px',
  boxShadow: 'var(--shadow)',
  animation: 'fadeIn 0.25s ease',
}

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🗑️</div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
          Delete Contact
        </h3>
        <p style={{ color: 'var(--text2)', marginBottom: '28px', lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '10px', background: 'var(--bg3)',
              color: 'var(--text2)', border: '1.5px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '10px', background: 'rgba(239,68,68,0.15)',
              color: 'var(--danger)', border: '1.5px solid var(--danger)',
              borderRadius: 'var(--radius-sm)', fontWeight: '600',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
