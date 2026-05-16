import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { toast } from '../components/Toast.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    if (!form.password.trim()) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await loginUser(form)
      login(res.data.token)
      toast.success('Welcome back!')
      navigate('/contacts')
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Check credentials.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: null }))
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
        top: '-100px', left: '-100px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
        bottom: '-80px', right: '-80px', pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '420px', padding: '20px',
        animation: 'fadeIn 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(108,99,255,0.3)',
          }}>👥</div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: '800',
            fontSize: '28px', color: 'var(--text)',
            letterSpacing: '-0.5px',
          }}>ContactHub</h1>
          <p style={{ color: 'var(--text2)', fontSize: '14px', marginTop: '4px' }}>
            Sign in to manage your contacts
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--card)',
          border: '1.5px solid var(--card-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow)',
        }}>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: '600',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text2)', marginBottom: '6px',
              }}>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                autoComplete="email"
                style={errors.email ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.email && (
                <div style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '5px' }}>
                  ⚠ {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: '600',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'var(--text2)', marginBottom: '6px',
              }}>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                style={errors.password ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.password && (
                <div style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '5px' }}>
                  ⚠ {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? 'var(--bg3)' : 'var(--accent)',
                color: loading ? 'var(--text3)' : '#fff',
                borderRadius: 'var(--radius-sm)',
                fontSize: '15px', fontWeight: '600',
                letterSpacing: '0.02em',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(108,99,255,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '13px', marginTop: '24px' }}>
          Contact Management System v1.0
        </p>
      </div>
    </div>
  )
}
