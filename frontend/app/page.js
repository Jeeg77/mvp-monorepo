
'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function HomePage() {

  const [health, setHealth] = useState('Loading...');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Verifica connessione backend
  useEffect(() => {
    api.get('/api/health')
      .then(res => setHealth(JSON.stringify(res.data)))
      .catch(err => setHealth(err.message));
  }, []);

  // Funzione centralizzata per le chiamate API
  const executeRequest = async (action, endpoint, payload) => {

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post(endpoint, payload);

      setResult({
        action,
        success: true,
        status: res.status,
        data: res.data
      });

    } catch (err) {

      setResult({
        action,
        success: false,
        status: err.response?.status || 'Network Error',
        data: err.response?.data || err.message
      });

    } finally {
      setLoading(false);
    }
  };

  // Registrazione
  const handleRegister = () => {
    executeRequest(
      'Register',
      '/api/auth/register',
      { email, password }
    );
  };

  // Login
  const handleLogin = () => {
    executeRequest(
      'Login',
      '/api/auth/login',
      { email, password }
    );
  };

  // Invio email
  const handleSendEmail = () => {
    executeRequest(
      'Send e-mail',
      '/api/email/send',
      { email }
    );
  };

  return (
    <main style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '10px'
    }}>

      <h1>MVP SaaS Starter</h1>

      {/* Backend health */}
      <div style={{
        background: '#f3f4f6',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '25px'
      }}>
        <strong>Backend status:</strong>
        <pre style={{ marginBottom: 0 }}>{health}</pre>
      </div>

      {/* Form */}
      <h2>Account</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="user@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
        />
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>

        <button
          onClick={handleRegister}
          disabled={loading || !email || !password}
          style={buttonStyle}
        >
          Register
        </button>

        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          style={buttonStyle}
        >
          Login
        </button>

        <button
          onClick={handleSendEmail}
          disabled={loading || !email}
          style={buttonStyle}
        >
          Send e-mail
        </button>

      </div>

      {/* API response */}
      {loading && (
        <p style={{ color: '#2563eb', marginTop: '25px' }}>
          Sending request...
        </p>
      )}

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '15px',
          borderRadius: '6px',
          background: result.success ? '#dcfce7' : '#fee2e2'
        }}>

          <h3>
            {result.action} - {result.success ? 'Success' : 'Error'}
          </h3>

          <p>
            HTTP Status: {result.status}
          </p>

          <pre style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere'
          }}>
            {JSON.stringify(result.data, null, 2)}
          </pre>

        </div>
      )}

    </main>
  );
}

// Inline styles
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const buttonStyle = {
  padding: '10px 18px',
  border: 'none',
  borderRadius: '5px',
  background: '#2563eb',
  color: 'white',
  cursor: 'pointer'
};
