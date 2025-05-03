import React, { useState } from 'react';
import axios from '../axios'; // veya 'src/axios' konumuna göre düzelt
import './IletisimFormu.css';

const IletisimFormu = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('⏳ Gönderiliyor...');

    try {
      await axios.post('http://localhost:5000/api/contact', form);
      setStatus('✅ Mesajınız başarıyla gönderildi.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('❌ Gönderim sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2>📩 Bizimle İletişime Geçin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Adınız"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-posta Adresiniz"
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Konu"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Mesajınız"
          required
        />
        <button type="submit">📨 Gönder</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default IletisimFormu;
