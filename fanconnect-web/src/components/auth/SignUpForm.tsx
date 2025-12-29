import { FormEvent, useMemo, useState } from 'react';
import './auth.css';

interface Props {
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: () => void;
}

function SignUpForm({ onClose, onSwitch, onSuccess }: Props) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = useMemo(() => {
    const emailOk = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    return (
      fullName.trim() &&
      username.trim() &&
      emailOk &&
      password.length >= 8 &&
      confirm === password &&
      agree
    );
  }, [fullName, username, email, password, confirm, agree]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 900);
  };

  return (
    <div className="auth-overlay" role="dialog" aria-modal="true">
      <form className="auth-card" onSubmit={handleSubmit}>
        <header className="auth-header">
          <button type="button" className="auth-secondary" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <h2 style={{ margin: '12px 0 0' }}>Join FanConnect</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>Connect with fans and never watch alone</p>
        </header>

        <div className="auth-body">
          <div className="auth-input">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Johnson"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="goalgetter"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              required
              value={confirm}
              minLength={8}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="signup-team">
              Favorite Team <span style={{ color: '#94a3b8' }}>(optional)</span>
            </label>
            <input
              id="signup-team"
              value={favoriteTeam}
              onChange={(e) => setFavoriteTeam(e.target.value)}
              placeholder="e.g., Manchester United"
            />
          </div>

          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{ marginTop: 5 }}
            />
            <span>
              I agree to the Terms of Service and Privacy Policy. You can update these preferences
              anytime.
            </span>
          </label>
        </div>

        <div className="auth-footer">
          <div>
            <span>Already have an account? </span>
            <button type="button" className="auth-link" onClick={onSwitch}>
              Log in
            </button>
          </div>
          <div className="auth-actions">
            <button type="button" className="auth-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="auth-primary" disabled={!isValid || loading}>
              {loading ? 'Creating…' : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;

