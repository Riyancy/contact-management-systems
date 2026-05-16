import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getContacts, createContact, updateContact, deleteContact } from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import ContactModal from '../components/ContactModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import { toast } from '../components/Toast.jsx'

const statusBadge = (status) => ({
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
  background: status === 'active' ? 'rgba(16,185,129,0.12)' : 'rgba(107,114,128,0.15)',
  color: status === 'active' ? 'var(--success)' : 'var(--text3)',
  border: `1px solid ${status === 'active' ? 'rgba(16,185,129,0.25)' : 'rgba(107,114,128,0.2)'}`,
})

const avatarColor = (name) => {
  const colors = ['#6c63ff', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#a78bfa', '#ec4899']
  const idx = name ? name.charCodeAt(0) % colors.length : 0
  return colors[idx]
}

const initials = (name) =>
  name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'

export default function Contacts() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editContact, setEditContact] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewMode, setViewMode] = useState('table')

  const fetchContacts = async () => {
    try {
      const res = await getContacts()
      setContacts(res.data.data || [])
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        logout(); navigate('/login')
      } else {
        toast.error('Failed to fetch contacts')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  const filtered = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch = !search ||
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search) ||
        c.contactId?.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all' || c.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [contacts, search, filterStatus])

  const handleSave = async (form) => {
    try {
      if (editContact) {
        await updateContact(editContact._id, form)
        toast.success('Contact updated successfully')
      } else {
        await createContact(form)
        toast.success('Contact created successfully')
      }
      setShowModal(false)
      setEditContact(null)
      fetchContacts()
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed'
      toast.error(msg)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteContact(deleteTarget._id)
      toast.success('Contact deleted')
      setDeleteTarget(null)
      fetchContacts()
    } catch (err) {
      toast.error('Failed to delete contact')
      setDeleteTarget(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.info('Logged out')
  }

  const stats = {
    total: contacts.length,
    active: contacts.filter(c => c.status === 'active').length,
    inactive: contacts.filter(c => c.status !== 'active').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px',
        background: 'var(--bg2)', borderRight: '1.5px solid var(--card-border)',
        display: 'flex', flexDirection: 'column', zIndex: 100,
        padding: '24px 0',
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1.5px solid var(--card-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
            }}>👥</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '18px' }}>
              ContactHub
            </span>
          </div>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-glow)', color: 'var(--accent)',
            fontWeight: '600', fontSize: '14px',
          }}>
            <span>📋</span> Contacts
          </div>
        </nav>

        <div style={{ padding: '20px 12px', borderTop: '1.5px solid var(--card-border)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '10px 12px',
              background: 'transparent', color: 'var(--text2)',
              border: '1.5px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px',
            }}
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: '220px', padding: '32px', minHeight: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Contacts
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '14px', marginTop: '2px' }}>
              {stats.total} total · {stats.active} active
            </p>
          </div>
          <button
            onClick={() => { setEditContact(null); setShowModal(true) }}
            style={{
              padding: '11px 22px',
              background: 'var(--accent)', color: '#fff',
              borderRadius: 'var(--radius-sm)', fontWeight: '600',
              fontSize: '14px', boxShadow: '0 4px 16px rgba(108,99,255,0.3)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> Add Contact
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Contacts', value: stats.total, icon: '👥', color: 'var(--accent)' },
            { label: 'Active', value: stats.active, icon: '✅', color: 'var(--success)' },
            { label: 'Inactive', value: stats.inactive, icon: '⏸', color: 'var(--text3)' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--card)', border: '1.5px solid var(--card-border)',
              borderRadius: 'var(--radius)', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'var(--bg3)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px',
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '2px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text3)', fontSize: '16px', pointerEvents: 'none',
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or ID..."
              style={{ paddingLeft: '38px' }}
            />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ width: 'auto', minWidth: '130px' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div style={{
            display: 'flex', background: 'var(--bg3)',
            border: '1.5px solid var(--card-border)', borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
          }}>
            {['table', 'grid'].map(v => (
              <button key={v} onClick={() => setViewMode(v)} style={{
                padding: '9px 14px', background: viewMode === v ? 'var(--accent)' : 'transparent',
                color: viewMode === v ? '#fff' : 'var(--text2)', fontSize: '13px',
                borderRadius: 0,
              }}>
                {v === 'table' ? '☰ Table' : '⊞ Grid'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text3)' }}>
            <div style={{ fontSize: '32px', animation: 'pulse 1.5s infinite' }}>⟳</div>
            <p style={{ marginTop: '12px' }}>Loading contacts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 0', color: 'var(--text3)',
            background: 'var(--card)', border: '1.5px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '16px', color: 'var(--text2)' }}>
              {search ? 'No contacts match your search' : 'No contacts yet'}
            </p>
            {!search && (
              <button
                onClick={() => { setEditContact(null); setShowModal(true) }}
                style={{
                  marginTop: '16px', padding: '10px 20px',
                  background: 'var(--accent)', color: '#fff',
                  borderRadius: 'var(--radius-sm)', fontWeight: '600',
                }}
              >
                Add First Contact
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <TableView
            contacts={filtered}
            onEdit={c => { setEditContact(c); setShowModal(true) }}
            onDelete={c => setDeleteTarget(c)}
          />
        ) : (
          <GridView
            contacts={filtered}
            onEdit={c => { setEditContact(c); setShowModal(true) }}
            onDelete={c => setDeleteTarget(c)}
          />
        )}
      </div>

      {showModal && (
        <ContactModal
          contact={editContact}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditContact(null) }}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

function TableView({ contacts, onEdit, onDelete }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1.5px solid var(--card-border)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--card-border)' }}>
              {['Contact', 'Contact ID', 'Phone', 'Address', 'Status', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '14px 16px', textAlign: 'left',
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--text3)',
                  background: 'var(--bg2)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr
                key={c._id}
                style={{
                  borderBottom: i < contacts.length - 1 ? '1px solid var(--card-border)' : 'none',
                  transition: 'background 0.15s',
                  animation: `fadeIn 0.3s ease ${i * 0.03}s both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: avatarColor(c.name),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '700', color: '#fff',
                    }}>
                      {initials(c.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text2)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <code style={{
                    fontSize: '12px', color: 'var(--accent2)',
                    background: 'rgba(108,99,255,0.1)', padding: '3px 8px', borderRadius: '6px',
                  }}>{c.contactId}</code>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text2)', fontSize: '14px' }}>{c.phone}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text2)', fontSize: '13px', maxWidth: '180px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.address}
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={statusBadge(c.status)}>
                    {c.status === 'active' ? '● ' : '○ '}{c.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onEdit(c)}
                      style={{
                        padding: '6px 14px', background: 'rgba(108,99,255,0.12)',
                        color: 'var(--accent)', border: '1px solid rgba(108,99,255,0.25)',
                        borderRadius: '6px', fontSize: '13px', fontWeight: '600',
                      }}
                    >Edit</button>
                    <button
                      onClick={() => onDelete(c)}
                      style={{
                        padding: '6px 14px', background: 'rgba(239,68,68,0.1)',
                        color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '6px', fontSize: '13px', fontWeight: '600',
                      }}
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: '12px 20px', borderTop: '1px solid var(--card-border)',
        color: 'var(--text3)', fontSize: '13px', background: 'var(--bg2)',
      }}>
        Showing {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

function GridView({ contacts, onEdit, onDelete }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
      animation: 'fadeIn 0.3s ease',
    }}>
      {contacts.map((c, i) => (
        <div
          key={c._id}
          style={{
            background: 'var(--card)', border: '1.5px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)', padding: '22px',
            transition: 'border-color 0.2s, transform 0.2s',
            animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--card-border)'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
              background: avatarColor(c.name),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: '700', color: '#fff',
            }}>
              {initials(c.name)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
              <span style={statusBadge(c.status)}>
                {c.status === 'active' ? '● ' : '○ '}{c.status}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '16px' }}>
            {[
              { icon: '✉', value: c.email },
              { icon: '📞', value: c.phone },
              { icon: '📍', value: c.address },
              { icon: '🏷', value: c.contactId, mono: true },
            ].map(row => (
              <div key={row.icon} style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '5px 0', borderBottom: '1px solid var(--card-border)',
              }}>
                <span style={{ flexShrink: 0 }}>{row.icon}</span>
                <span style={{
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  fontFamily: row.mono ? 'monospace' : 'inherit',
                  color: row.mono ? 'var(--accent2)' : 'var(--text2)',
                }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit(c)}
              style={{
                flex: 1, padding: '8px',
                background: 'rgba(108,99,255,0.1)', color: 'var(--accent)',
                border: '1px solid rgba(108,99,255,0.2)',
                borderRadius: '8px', fontSize: '13px', fontWeight: '600',
              }}
            >✏ Edit</button>
            <button
              onClick={() => onDelete(c)}
              style={{
                flex: 1, padding: '8px',
                background: 'rgba(239,68,68,0.08)', color: 'var(--danger)',
                border: '1px solid rgba(239,68,68,0.18)',
                borderRadius: '8px', fontSize: '13px', fontWeight: '600',
              }}
            >🗑 Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
