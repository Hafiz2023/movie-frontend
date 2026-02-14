'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Fake delay (simulate API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form Data:', formData);

      setMessage('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Contact Support</h2>
        <p style={styles.subtitle}>
          Have questions? Send us a message and we’ll respond soon.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            placeholder="Your Name"
            style={styles.input}
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Your Email"
            style={styles.input}
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
            style={styles.input}
          />

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={styles.input}
          >
            <option>General Inquiry</option>
            <option>Billing Issue</option>
            <option>Technical Support</option>
            <option>Partnership</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message..."
            style={{ ...styles.input, height: '120px' }}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Sending...' : 'Send Message'}
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
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#111',
    padding: '20px',
  },
  card: {
    background: '#1f1f1f',
    padding: '40px',
    borderRadius: '12px',
    width: '400px',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#aaa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #333',
    background: '#2a2a2a',
    color: '#fff',
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
