import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Hash } from 'lucide-react';

const initialForm = {
  contactId: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  status: 'active',
};

export default function ContactModal({ isOpen, onClose, onSubmit, editContact, loading }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editContact) {
      setForm({
        contactId: editContact.contactId || '',
        name: editContact.name || '',
        email: editContact.email || '',
        phone: editContact.phone || '',
        address: editContact.address || '',
        status: editContact.status || 'active',
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editContact, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.contactId.trim()) errs.contactId = 'Contact ID is required';
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal} className="fade-in">
        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.headerLabel}>{editContact ? 'EDIT RECORD' : 'NEW RECORD'}</p>
            <h2 style={styles.headerTitle}>{editContact ? 'Update Contact' : 'Add Contact'}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.grid}>
            <Field
              icon={<Hash size={15} />}
              label="Contact ID"
              name="contactId"
              value={form.contactId}
              onChange={handleChange}
              error={errors.contactId}
              placeholder="e.g. C-001"
              disabled={!!editContact}
            />
            <Field
              icon={<User size={15} />}
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="John Doe"
            />
            <Field
              icon={<Mail size={15} />}
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
            />
            <Field
              icon={<Phone size={15} />}
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+94 77 123 4567"
            />
          </div>

          <Field
            icon={<MapPin size={15} />}
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="123 Main Street, Colombo"
            style={{ marginBottom: '16px' }}
          />

          {/* Status */}
          <div style={{ marginBottom: '24px' }}>
            <label style={styles.label}>Status</label>
            <div style={styles.statusRow}>
              {['active', 'inactive'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                  style={{
                    ...styles.statusBtn,
                    ...(form.status === s ? styles.statusBtnActive(s) : {}),
                  }}
                >
                  <span style={{
                    ...styles.statusDot,
                    background: s === 'active' ? 'var(--green)' : 'var(--text-muted)',
                  }} />
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span style={styles.spinner} />
              ) : (
                editContact ? 'Update Contact' : 'Create Contact'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ icon, label, name, value, onChange, error, placeholder, type = 'text', disabled, style }) {
  return (
    <div style={{ marginBottom: '16px', ...style }}>
      <label style={styles.label}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={styles.fieldIcon}>{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            ...styles.input,
            ...(error ? styles.inputError : {}),
            ...(disabled ? styles.inputDisabled : {}),
          }}
        />
      </div>
      {error && <p style={styles.errorMsg}>{error}</p>}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px',
  },
  modal: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    width: '100%', maxWidth: '560px',
    padding: '28px',
    boxShadow: 'var(--shadow), var(--shadow-accent)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: '28px',
  },
  headerLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px', letterSpacing: '0.15em',
    color: 'var(--accent)', marginBottom: '4px',
  },
  headerTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px', fontWeight: 700,
    color: 'var(--text-primary)',
  },
  closeBtn: {
    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    color: 'var(--text-secondary)', cursor: 'pointer',
    borderRadius: '8px', padding: '7px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px',
  },
  label: {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em',
    color: 'var(--text-secondary)', marginBottom: '8px',
    textTransform: 'uppercase',
  },
  fieldIcon: {
    position: 'absolute', left: '13px', top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    display: 'flex', alignItems: 'center',
    pointerEvents: 'none',
  },
  input: {
    width: '100%', padding: '11px 13px 11px 38px',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputError: { borderColor: 'var(--red)' },
  inputDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  errorMsg: {
    color: 'var(--red)', fontSize: '12px', marginTop: '5px',
    fontFamily: 'var(--font-body)',
  },
  statusRow: { display: 'flex', gap: '10px' },
  statusBtn: {
    flex: 1, padding: '10px 14px',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-secondary)',
    cursor: 'pointer', fontFamily: 'var(--font-body)',
    fontSize: '14px', fontWeight: 500,
    display: 'flex', alignItems: 'center', gap: '8px',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  statusBtnActive: (s) => ({
    background: s === 'active' ? 'var(--green-soft)' : 'rgba(68,68,90,0.2)',
    borderColor: s === 'active' ? 'var(--green)' : 'var(--text-muted)',
    color: 'var(--text-primary)',
  }),
  statusDot: {
    width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
  },
  actions: {
    display: 'flex', gap: '12px', justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: '11px 22px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-secondary)',
    cursor: 'pointer', fontFamily: 'var(--font-body)',
    fontSize: '14px', fontWeight: 500,
  },
  submitBtn: {
    padding: '11px 28px',
    background: 'var(--accent)',
    border: 'none', borderRadius: 'var(--radius)',
    color: '#fff',
    cursor: 'pointer', fontFamily: 'var(--font-display)',
    fontSize: '14px', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minWidth: '140px',
    transition: 'opacity 0.2s',
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
