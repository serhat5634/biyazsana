import React, { useState } from 'react';
import axios from '../axios';

const ReklamEkle = () => {
  const MAX_TITLE = 50;
  const MAX_DESC = 250;

  const [form, setForm] = useState({
    reklamTuru: '',
    reklamBasligi: '',
    aciklama: '',
    link: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
    facebook: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'reklamBasligi' && value.length > MAX_TITLE) return;
    if (name === 'aciklama' && value.length > MAX_DESC) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = sessionStorage.getItem('token'); // 🔐 Token'i sessionStorage'dan al

    try {
      await axios.post('/ads', form, {
        headers: { Authorization: `Bearer ${token}` }, // 🚀 Token headers'ta net olarak belirtildi
      });

      setMessage('✅ Reklam başarıyla gönderildi!');
      setForm({
        reklamTuru: '',
        reklamBasligi: '',
        aciklama: '',
        link: '',
        instagram: '',
        twitter: '',
        youtube: '',
        tiktok: '',
        linkedin: '',
        facebook: '',
      });
    } catch (err) {
      setMessage('❌ Hata: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📢 Reklamını Gönder</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="reklamTuru"
          value={form.reklamTuru}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">🔽 Reklam Türü Seçiniz</option>
          <option value="product">🚀 Ürün / Site Reklamı</option>
          <option value="social">📱 Sosyal Medyada Kendini Tanıt</option>
        </select>

        <div>
          <input
            name="reklamBasligi"
            placeholder="✨ Reklam Başlığı (max 50 karakter)"
            value={form.reklamBasligi}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.charCount}>
            {form.reklamBasligi.length}/{MAX_TITLE} karakter
          </div>
        </div>

        <div>
          <textarea
            name="aciklama"
            placeholder="📝 Açıklama (isteğe bağlı, max 250 karakter)"
            value={form.aciklama}
            onChange={handleChange}
            rows={4}
            style={styles.textarea}
          />
          <div style={styles.charCount}>
            {form.aciklama.length}/{MAX_DESC} karakter
          </div>
        </div>

        {form.reklamTuru === 'product' && (
          <input
            name="link"
            placeholder="🔗 Web Sitesi veya Ürün Linki"
            value={form.link}
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        {form.reklamTuru === 'social' && (
          <>
            <input name="instagram" placeholder="📸 Instagram @kullanici" value={form.instagram} onChange={handleChange} style={styles.input} />
            <input name="twitter" placeholder="🐦 Twitter @kullanici" value={form.twitter} onChange={handleChange} style={styles.input} />
            <input name="youtube" placeholder="▶️ YouTube Kanalı Linki" value={form.youtube} onChange={handleChange} style={styles.input} />
            <input name="tiktok" placeholder="🎵 TikTok @kullanici" value={form.tiktok} onChange={handleChange} style={styles.input} />
            <input name="linkedin" placeholder="💼 LinkedIn Linki" value={form.linkedin} onChange={handleChange} style={styles.input} />
            <input name="facebook" placeholder="📘 Facebook Linki" value={form.facebook} onChange={handleChange} style={styles.input} />
          </>
        )}

        <button type="submit" style={styles.submitBtn}>
          🚀 Reklamı Gönder
        </button>
      </form>

      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.startsWith('✅') ? styles.successMsg : styles.errorMsg),
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    border: '1px solid #ddd',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '10px',
    resize: 'vertical',
  },
  charCount: {
    textAlign: 'right',
    color: '#888',
    fontSize: '13px',
    marginBottom: '15px',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00bfa5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: '500',
  },
  successMsg: {
    backgroundColor: '#e6fffa',
    color: '#2f855a',
    border: '1px solid #c6f6d5',
  },
  errorMsg: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    border: '1px solid #fed7d7',
  },
};

export default ReklamEkle;
