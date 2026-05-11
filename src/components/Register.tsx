import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../styles/auth.css'

interface RegisterProps {
  onSwitchToLogin: () => void
}

export function Register({ onSwitchToLogin }: RegisterProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const { register, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(username, email, password, passwordConfirm)
    } catch {
      // Error is handled in context
    } finally {
      setIsLoading(false)
    }
  }

  const passwordsMatch = password === passwordConfirm

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Daftar</h1>
          <p>Buat akun baru untuk memulai</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username123"
              required
              minLength={3}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@contoh.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Konfirmasi Password</label>
            <div className="password-input-wrap">
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
                style={!passwordsMatch && passwordConfirm ? { borderColor: 'var(--danger)' } : {}}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? '🙈' : '👁'}
              </button>
            </div>
            {!passwordsMatch && passwordConfirm && (
              <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 6 }}>
                Password tidak cocok
              </div>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading || !passwordsMatch}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="switch-auth-btn"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
