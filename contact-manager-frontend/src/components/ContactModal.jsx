import { useState, useEffect } from 'react'

const overlayStyle = {
  position: 'fixed', inset: 0, zIndex: 1000,
  background: 'rgba(0,0,0,0.75)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(6px)',
  animation: 'fadeIn 0.2s ease',
  padding: '20px',
}

const modalStyle = {
  background: 'var(--card)',
  border: '1.5px solid var(--card-border)',
  borderRadius: 'var(--radius-lg)',
  padding: '32px',
  width: '100%', maxWidth: '520px',
  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  animation: 'fadeIn 0.25s ease',
  maxHeight: '90vh',
  overflowY: 'auto',
}

const fieldStyle = { marginBottom: '18px' }
const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text2)',
  marginBottom: '6px',
}
const errorStyle = {
  fontSize: '12px',
  color: 'var(--danger)',
  marginTop: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}

const generateContactId = () => 'C-' + Math.random().toString(36).substr(2, 6).toUpperCase()

export default function ContactModal({ contact, onSave, onClose }) {
  const isEdit = !!contact

  const [form, setForm] = useState({
    contactId: contact?.contactId || generateContactId(),
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    address: contact?.address || '',
    status: contact?.status || 'active',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = 'Phone must be exactly 10 digits (numbers only)'
    }
    if (!form.address.trim()) errs.address = 'Address is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    // For phone: only allow digits, max 10
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setForm(p => ({ ...p, phone: digits }))
      // Live validation feedback
      if (digits.length > 0 && digits.length !== 10) {
        setErrors(p => ({ ...p, phone: `${digits.length}/10 digits entered` }))
      } else if (digits.length === 10) {
        setErrors(p => ({ ...p, phone: null }))
      } else {
        setErrors(p => ({ ...p, phone: null }))
      }
      return
    }
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: null }))
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontFamily: 'Syne, sans-serif', fontWeight: '700', color: 'var(--text)' }}>
              {isEdit ? 'Edit Contact' : 'New Contact'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '2px' }}>
              {isEdit ? `Editing ${contact.name}` : 'Fill in the details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'var(--bg3)', color: 'var(--text2)',
              border: '1.5px solid var(--card-border)', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>

        {/* Contact ID (read-only) */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Contact ID</label>
          <input
            value={form.contactId}
            readOnly
            style={{ background: 'var(--bg)', color: 'var(--text3)', cursor: 'not-allowed', fontFamily: 'monospace' }}
          />
        </div>

        {/* Name */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Kasun Perera"
            style={errors.name ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.name && <div style={errorStyle}>⚠ {errors.name}</div>}
        </div>

        {/* Email */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Email Address *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. kasun@example.com"
            style={errors.email ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.email && <div style={errorStyle}>⚠ {errors.email}</div>}
        </div>

        {/* Phone */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Phone Number * (10 digits)</label>
          <div style={{ position: 'relative' }}>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 0771234567"
              inputMode="numeric"
              maxLength={10}
              style={{
                paddingRight: '60px',
                borderColor: errors.phone
                  ? (form.phone.length === 10 ? 'var(--success)' : 'var(--danger)')
                  : form.phone.length === 10 ? 'var(--success)' : '',
              }}
            />
            <span style={{
              position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
              fontSize: '12px', fontWeight: '600',
              color: form.phone.length === 10 ? 'var(--success)' : 'var(--text3)',
            }}>
              {form.phone.length}/10
            </span>
          </div>
          {errors.phone && (
            <div style={errorStyle}>
              ⚠ {errors.phone}
            </div>
          )}
          {!errors.phone && form.phone.length > 0 && form.phone.length < 10 && (
            <div style={{ ...errorStyle, color: 'var(--warning)' }}>
              ⚠ Need {10 - form.phone.length} more digit{10 - form.phone.length !== 1 ? 's' : ''}
            </div>
          )}
          {form.phone.length === 10 && (
            <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '5px' }}>✓ Valid phone number</div>
          )}
        </div>

        {/* Address */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Address *</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="e.g. 45 Galle Road, Colombo 03"
            style={errors.address ? { borderColor: 'var(--danger)' } : {}}
          />
          {errors.address && <div style={errorStyle}>⚠ {errors.address}</div>}
        </div>

        {/* Status */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '12px',
              background: 'var(--bg3)', color: 'var(--text2)',
              border: '1.5px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 2, padding: '12px',
              background: loading ? 'var(--bg3)' : 'var(--accent)',
              color: loading ? 'var(--text3)' : '#fff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600', fontSize: '15px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Contact'}
          </button>
        </div>
      </div>
    </div>
  )
}
