import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Search, RefreshCw, BookUser, Filter } from 'lucide-react';

import { contactService } from './services/api';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import StatsBar from './components/StatsBar';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ─── Fetch ─── */
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll();
      setContacts(res.data.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  /* ─── Filter ─── */
  useEffect(() => {
    let list = [...contacts];
    if (statusFilter !== 'all') list = list.filter((c) => c.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.contactId.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [contacts, search, statusFilter]);

  /* ─── Create ─── */
  const handleCreate = async (data) => {
    setActionLoading(true);
    try {
      await contactService.create(data);
      toast.success('Contact created!');
      setCreateOpen(false);
      fetchContacts();
    } catch (err) {
      toast.error(err.message || 'Failed to create contact');
    } finally {
      setActionLoading(false);
    }
  };

  /* ─── Update ─── */
  const handleUpdate = async (data) => {
    setActionLoading(true);
    try {
      await contactService.update(editContact._id, data);
      toast.success('Contact updated!');
      setEditContact(null);
      fetchContacts();
    } catch (err) {
      toast.error(err.message || 'Failed to update contact');
    } finally {
      setActionLoading(false);
    }
  };

  /* ─── Delete ─── */
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await contactService.delete(deleteTarget._id);
      toast.success('Contact deleted');
      setDeleteTarget(null);
      fetchContacts();
    } catch (err) {
      toast.error(err.message || 'Failed to delete contact');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      {/* Background orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={styles.container}>
        {/* ── Header ── */}
        <header style={styles.header}>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>
              <BookUser size={20} color="var(--accent)" />
            </div>
            <div>
              <h1 style={styles.logoTitle}>ContactVault</h1>
              <p style={styles.logoSub}>Contact Management System</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.refreshBtn} onClick={fetchContacts} title="Refresh" disabled={loading}>
              <RefreshCw size={15} style={loading ? { animation: 'spin 1s linear infinite' } : {}} />
            </button>
            <button style={styles.addBtn} onClick={() => setCreateOpen(true)}>
              <Plus size={16} />
              Add Contact
            </button>
          </div>
        </header>

        {/* ── Stats ── */}
        <StatsBar contacts={contacts} />

        {/* ── Toolbar ── */}
        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <Search size={15} style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search by name, email, phone or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.filterRow}>
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            {['all', 'active', 'inactive'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  ...styles.filterBtn,
                  ...(statusFilter === s ? styles.filterBtnActive : {}),
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div style={styles.stateBox}>
            <div style={styles.bigSpinner} />
            <p style={styles.stateText}>Loading contacts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.stateBox}>
            <div style={styles.emptyIcon}>
              <BookUser size={32} color="var(--text-muted)" />
            </div>
            <p style={styles.stateTitle}>
              {search || statusFilter !== 'all' ? 'No matching contacts' : 'No contacts yet'}
            </p>
            <p style={styles.stateText}>
              {search || statusFilter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Click "Add Contact" to create your first entry.'}
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((c, i) => (
              <ContactCard
                key={c._id}
                contact={c}
                onEdit={setEditContact}
                onDelete={setDeleteTarget}
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      <ContactModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        editContact={null}
        loading={actionLoading}
      />
      <ContactModal
        isOpen={!!editContact}
        onClose={() => setEditContact(null)}
        onSubmit={handleUpdate}
        editContact={editContact}
        loading={actionLoading}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        contactName={deleteTarget?.name}
        loading={actionLoading}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: 'var(--green)', secondary: 'var(--bg-elevated)' } },
          error: { iconTheme: { primary: 'var(--red)', secondary: 'var(--bg-elevated)' } },
        }}
      />
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    background: 'var(--bg)',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'fixed',
    top: '-120px', left: '-120px',
    width: '400px', height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'fixed',
    bottom: '-100px', right: '-100px',
    width: '350px', height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 24px 60px',
    position: 'relative', zIndex: 1,
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '32px',
    flexWrap: 'wrap', gap: '16px',
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: '14px',
  },
  logoIcon: {
    width: '46px', height: '46px',
    background: 'var(--accent-soft)',
    border: '1px solid rgba(108,99,255,0.25)',
    borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px', fontWeight: 800,
    color: 'var(--text-primary)',
    lineHeight: 1.1,
  },
  logoSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px', color: 'var(--text-muted)',
    marginTop: '2px',
  },
  headerActions: {
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  refreshBtn: {
    padding: '10px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 20px',
    background: 'var(--accent)',
    border: 'none', borderRadius: 'var(--radius)',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600,
    boxShadow: '0 4px 18px rgba(108,99,255,0.35)',
    transition: 'opacity 0.2s, transform 0.15s',
  },
  toolbar: {
    display: 'flex', alignItems: 'center', gap: '12px',
    marginBottom: '24px', flexWrap: 'wrap',
  },
  searchWrap: {
    flex: 1, minWidth: '220px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute', left: '13px', top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)', pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 38px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: '14px',
    outline: 'none',
  },
  filterRow: {
    display: 'flex', alignItems: 'center', gap: '6px',
  },
  filterBtn: {
    padding: '8px 14px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '13px',
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: 'var(--accent-soft)',
    borderColor: 'rgba(108,99,255,0.4)',
    color: 'var(--accent)',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  stateBox: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '80px 20px', gap: '14px',
  },
  bigSpinner: {
    width: '36px', height: '36px',
    border: '3px solid var(--border)',
    borderTopColor: 'var(--accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  emptyIcon: {
    width: '70px', height: '70px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stateTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px', fontWeight: 700,
    color: 'var(--text-primary)',
  },
  stateText: {
    fontSize: '14px', color: 'var(--text-muted)',
    textAlign: 'center',
  },
};
