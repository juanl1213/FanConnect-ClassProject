import { FormEvent, useMemo, useState } from 'react';
import './auth.css';

interface Props {
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: () => void;
}

function LoginForm({ onClose, onSwitch, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = useMemo(() => {
    const emailOk = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    return emailOk && password.trim().length > 0;
  }, [email, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password.trim().length >= 6) {
        onSuccess();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 900);
  };

  return (
    <div className="auth-overlay" role="dialog" aria-modal="true">
      <form className="auth-card" onSubmit={handleSubmit}>
        <header className="auth-header">
          <button type="button" className="auth-secondary" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <h2 style={{ margin: '12px 0 0' }}>Welcome Back</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Log in to continue your journey</p>
        </header>

        <div className="auth-body">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-input">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="login-password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingRight: 88 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="auth-link"
                style={{ position: 'absolute', right: 10, top: 10 }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="auth-link">
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <div>
            <span>New here? </span>
            <button type="button" className="auth-link" onClick={onSwitch}>
              Create an account
            </button>
          </div>
          <div className="auth-actions">
            <button type="button" className="auth-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="auth-primary" disabled={!isValid || loading}>
              {loading ? 'Signing in…' : 'Log In'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

