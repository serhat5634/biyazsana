import React, { useState } from 'react';
import axios from '../axios'; // veya 'src/axios' konumuna göre düzelt


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
    facebook: ''
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

    try {
      await axios.post('http://localhost:5000/api/reklamlar', form);
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
        facebook: ''
      });
    } catch (err) {
      setMessage('❌ Hata: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">📢 Reklamını Gönder</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="reklamTuru" value={form.reklamTuru} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300">
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
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <div className="text-right text-sm text-gray-500 mt-1">{form.reklamBasligi.length}/{MAX_TITLE} karakter</div>
        </div>

        <div>
          <textarea
            name="aciklama"
            placeholder="📝 Açıklama (isteğe bağlı, max 250 karakter)"
            value={form.aciklama}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 resize-vertical"
          />
          <div className="text-right text-sm text-gray-500 mt-1">{form.aciklama.length}/{MAX_DESC} karakter</div>
        </div>

        {form.reklamTuru === 'product' && (
          <input name="link" placeholder="🔗 Web Sitesi veya Ürün Linki" value={form.link} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300"/>
        )}

        {form.reklamTuru === 'social' && (
          <>
            <input name="instagram" placeholder="📸 Instagram @kullanici" value={form.instagram} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
            <input name="twitter" placeholder="🐦 Twitter @kullanici" value={form.twitter} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
            <input name="youtube" placeholder="▶️ YouTube Kanalı Linki" value={form.youtube} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
            <input name="tiktok" placeholder="🎵 TikTok @kullanici" value={form.tiktok} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
            <input name="linkedin" placeholder="💼 LinkedIn Linki" value={form.linkedin} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
            <input name="facebook" placeholder="📘 Facebook Linki" value={form.facebook} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300"/>
          </>
        )}

        <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-200 shadow">
          🚀 Reklamı Gönder
        </button>
      </form>

      {message && (
        <div className={`mt-4 text-center p-3 rounded-lg font-medium ${message.startsWith('✅') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ReklamEkle;
