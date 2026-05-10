import React from 'react';
import { Mail, Phone, MapPin, Pencil, Trash2 } from 'lucide-react';

export default function ContactCard({ contact, onEdit, onDelete, style }) {
  const initials = contact.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const hue = (contact.name.charCodeAt(0) * 47) % 360;

  return (
    <div style={{ ...styles.card, ...style }} className="fade-in">
      {/* Avatar & name */}
      <div style={styles.top}>
        <div
          style={{
            ...styles.avatar,
            background: `hsl(${hue}, 60%, 18%)`,
            border: `1.5px solid hsl(${hue}, 60%, 35%)`,
            color: `hsl(${hue}, 70%, 70%)`,
          }}
        >
          {initials}
        </div>
        <div style={styles.nameBlock}>
          <h3 style={styles.name}>{contact.name}</h3>
          <span
            style={{
              ...styles.badge,
              ...(contact.status === 'active' ? styles.badgeActive : styles.badgeInactive),
            }}
          >
            <span style={{
              ...styles.dot,
              background: contact.status === 'active' ? 'var(--green)' : 'var(--text-muted)',
            }} />
            {contact.status}
          </span>
        </div>
        <div style={styles.actions}>
          <button style={styles.actionBtn} onClick={() => onEdit(contact)} title="Edit">
            <Pencil size={14} />
          </button>
          <button
            style={{ ...styles.actionBtn, ...styles.actionBtnDanger }}
            onClick={() => onDelete(contact)}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Info rows */}
      <div style={styles.infoList}>
        <InfoRow icon={<Mail size={13} />} value={contact.email} />
        <InfoRow icon={<Phone size={13} />} value={contact.phone} />
        <InfoRow icon={<MapPin size={13} />} value={contact.address} />
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerLabel}>ID</span>
        <span style={styles.footerValue}>{contact.contactId}</span>
      </div>
    </div>
  );
}

function InfoRow({ icon, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoIcon}>{icon}</span>
      <span style={styles.infoValue}>{value}</span>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    transition: 'border-color 0.25s, transform 0.2s',
    cursor: 'default',
  },
  top: {
    display: 'flex', alignItems: 'center', gap: '14px',
    marginBottom: '16px',
  },
  avatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700,
    flexShrink: 0,
  },
  nameBlock: {
    flex: 1, minWidth: 0,
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: '15px', fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '4px',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '2px 9px',
    borderRadius: '20px',
    fontSize: '11px', fontWeight: 600,
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  badgeActive: {
    background: 'var(--green-soft)',
    color: 'var(--green)',
    border: '1px solid rgba(34,197,94,0.25)',
  },
  badgeInactive: {
    background: 'rgba(68,68,90,0.15)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
  },
  dot: {
    width: '5px', height: '5px', borderRadius: '50%',
  },
  actions: {
    display: 'flex', gap: '6px',
  },
  actionBtn: {
    padding: '7px',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  actionBtnDanger: {
    color: 'var(--red)',
    borderColor: 'rgba(239,68,68,0.2)',
    background: 'var(--red-soft)',
  },
  divider: {
    height: '1px',
    background: 'var(--border)',
    marginBottom: '16px',
  },
  infoList: {
    display: 'flex', flexDirection: 'column', gap: '8px',
    marginBottom: '16px',
  },
  infoRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  infoIcon: {
    color: 'var(--accent)', flexShrink: 0, opacity: 0.8,
  },
  infoValue: {
    fontSize: '13px', color: 'var(--text-secondary)',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  footer: {
    display: 'flex', alignItems: 'center', gap: '8px',
    paddingTop: '12px',
    borderTop: '1px solid var(--border)',
  },
  footerLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
    color: 'var(--text-muted)', textTransform: 'uppercase',
  },
  footerValue: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px', color: 'var(--text-secondary)',
    background: 'var(--bg-elevated)',
    padding: '2px 8px', borderRadius: '6px',
    border: '1px solid var(--border)',
  },
};
