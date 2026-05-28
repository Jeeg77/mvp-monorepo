'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function HomePage() {
  const [health, setHealth] = useState('Loading...');

  useEffect(() => {
    api.get('/api/health')
      .then(res => setHealth(JSON.stringify(res.data)))
      .catch(err => setHealth(err.message));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>MVP SaaS Starter</h1>
      <pre>{health}</pre>
    </main>
  );
}