import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, contactName, loading }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal} className="fade-in">
        <div style={styles.iconWrap}>
          <AlertTriangle size={26} color="var(--red)" />
        </div>
        <h3 style={styles.title}>Delete Contact</h3>
        <p style={styles.message}>
          Are you sure you want to delete{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{contactName}</strong>?
          <br />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>This action cannot be undone.</span>
        </p>
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.deleteBtn} onClick={onConfirm} disabled={loading}>
            {loading ? <span style={styles.spinner} /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1100, padding: '16px',
  },
  modal: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    width: '100%', maxWidth: '400px',
    padding: '32px 28px',
    textAlign: 'center',
    boxShadow: 'var(--shadow)',
  },
  iconWrap: {
    width: '56px', height: '56px',
    background: 'var(--red-soft)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 18px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px', fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '10px',
  },
  message: {
    color: 'var(--text-secondary)',
    fontSize: '14px', lineHeight: '1.7',
    marginBottom: '28px',
  },
  actions: {
    display: 'flex', gap: '12px',
  },
  cancelBtn: {
    flex: 1, padding: '11px',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
  },
  deleteBtn: {
    flex: 1, padding: '11px',
    background: 'var(--red)',
    border: 'none',
    borderRadius: 'var(--radius)',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  spinner: {
    display: 'inline-block',
    width: '16px', height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
};
