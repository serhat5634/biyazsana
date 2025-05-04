import React, { useState } from 'react';
import axios from '../axios'; // ✅ Merkezi axios kullanımı
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ? '/users/register' : '/auth/login';

    try {
      const res = await axios.post(endpoint, form);

      if (!res.data?.token) {
        throw new Error('❌ Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      }

      sessionStorage.setItem('token', res.data.token);
      setForm({ email: '', password: '', name: '' }); // ✅ Form sıfırlandı
      navigate('/yazi');
    } catch (error) {
      const backendMsg = error.response?.data?.msg;
      setError(backendMsg || '❌ Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const googleLogin = () => {
    window.open('/auth/google', '_self'); // ✅ axios baseURL kullandığı için kısaltıldı
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              name="name"
              type="text"
              placeholder="Ad Soyad"
              required
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="E-posta Adresiniz"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Şifreniz"
            required
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">
            {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>

          <button type="button" className="google-btn" onClick={googleLogin}>
            Google ile Giriş Yap
          </button>

          <p className="switch-mode">
            {isRegister ? 'Hesabınız var mı?' : 'Hesabınız yok mu?'}{' '}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Giriş Yapın' : 'Kayıt Olun'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
