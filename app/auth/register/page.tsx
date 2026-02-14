'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setMessage('Please agree to terms.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fake success response
      const fakeResponse = {
        user: { name, email },
        token: 'mock-token',
      };

      console.log('User Registered:', fakeResponse);

      setMessage('Account created successfully!');
      router.push('/dashboard'); // change if needed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
          />

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to terms
          </label>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles: any = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#111',
  },
  card: {
    background: '#1f1f1f',
    padding: '40px',
    borderRadius: '12px',
    width: '350px',
    color: '#fff',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #333',
    background: '#2a2a2a',
    color: '#fff',
  },
  checkbox: {
    fontSize: '14px',
    textAlign: 'left',
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    background: '#ff4c29',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    fontSize: '14px',
  },
};
