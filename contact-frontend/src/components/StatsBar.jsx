import React from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';

export default function StatsBar({ contacts }) {
  const total = contacts.length;
  const active = contacts.filter((c) => c.status === 'active').length;
  const inactive = total - active;

  return (
    <div style={styles.row}>
      <StatCard icon={<Users size={18} />} label="Total Contacts" value={total} color="var(--accent)" />
      <StatCard icon={<CheckCircle size={18} />} label="Active" value={active} color="var(--green)" />
      <StatCard icon={<XCircle size={18} />} label="Inactive" value={inactive} color="var(--text-muted)" />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.iconWrap, color, background: `${color}18`, border: `1px solid ${color}30` }}>
        {icon}
      </div>
      <div>
        <p style={styles.label}>{label}</p>
        <p style={{ ...styles.value, color }}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
    marginBottom: '28px',
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '16px 18px',
    display: 'flex', alignItems: 'center', gap: '14px',
  },
  iconWrap: {
    width: '40px', height: '40px',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px', fontWeight: 600,
    letterSpacing: '0.05em', textTransform: 'uppercase',
    color: 'var(--text-muted)', marginBottom: '2px',
  },
  value: {
    fontFamily: 'var(--font-display)',
    fontSize: '26px', fontWeight: 800,
    lineHeight: 1,
  },
};
