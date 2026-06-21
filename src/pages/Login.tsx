import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Navigation2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RouteAnimation } from '../components/RouteAnimation';

const STATIC_USER = 'admin';
const STATIC_PASS = 'a@123';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (username.trim() === STATIC_USER && password === STATIC_PASS) {
        localStorage.setItem('authed', 'true');
        localStorage.setItem('username', username.trim());
        navigate('/');
      } else {
        setError('Incorrect username or password.');
        setShake(true);
        setTimeout(() => setShake(false), 450);
      }
    }, 550);
  }

  return (
    <div className="ftl-login-grid">
      <div className="ftl-hero">
        <RouteAnimation variant="vertical" />
        <div className="ftl-hero-copy">
          <span className="ftl-eyebrow">LIVE FLEET TRACKING</span>
          <h1>Every vehicle,<br />one signal away.</h1>
          <p>Real-time positions, route history and geofence alerts in a single view.</p>
        </div>
      </div>

      <div className="ftl-form-side">
        <form className={`ftl-card ${shake ? 'ftl-shake' : ''}`} onSubmit={handleSubmit} noValidate>
          <div className="ftl-card-head">
            <div className="ftl-logo">
              <Navigation2 size={24} />
            </div>
            <div>
              <h2>Welcome back</h2>
              <p className="ftl-muted">Sign in to the tracking console</p>
            </div>
          </div>

          <label className="ftl-label" htmlFor="ftl-username">Username</label>
          <input
            id="ftl-username"
            ref={userRef}
            className="ftl-input"
            type="text"
            autoComplete="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="ftl-label" htmlFor="ftl-password">Password</label>
          <div className="ftl-password-wrap">
            <input
              id="ftl-password"
              className="ftl-input"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="ftl-eye-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <div className="ftl-error" role="alert">{error}</div>}

          <button type="submit" className="ftl-submit" disabled={loading}>
            {loading ? <span className="ftl-spinner" /> : <>Sign in <ShieldCheck size={18} /></>}
          </button>

          <p className="ftl-hint">demo credentials — admin / a@123</p>
        </form>
      </div>
    </div>
  );
}
