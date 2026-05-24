import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { api } from '../api/api';
import './Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify({ name: data.name, email: data.email }));
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Cannot reach server. Please try again in 30 seconds (server may be waking up).');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-login slide-in-up">
        <Link to="/" className="admin-login__back">
          ← Back to website
        </Link>
        <div className="admin-login__logo">
          <Logo size="lg" />
        </div>
        <h1>Admin Login</h1>
        <p>Manage your website content</p>
        <p>Only For - Admin Access</p>
        <form onSubmit={handleSubmit} className="admin-form">
          {error && <div className="admin-form__error">{error}</div>}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter the admin"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
     </div>
    </div>
  );
}
