import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Google redirect sonrası token yakalama
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      sessionStorage.setItem('token', token);
      window.location.href = '/yazi'; // doğrudan yönlendir
    }
  }, []);

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
      setForm({ email: '', password: '', name: '' });
      navigate('/yazi');
    } catch (error) {
      const backendMsg = error.response?.data?.msg;
      setError(backendMsg || '❌ Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const googleLogin = () => {
    window.open('https://biyazsana-backend-1.onrender.com/api/auth/google', '_self');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              className="login-input"
              name="name"
              type="text"
              placeholder="Ad Soyad"
              required
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="E-posta Adresiniz"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Şifreniz"
            required
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="error-message">{error}</p>}

          <button className="login-btn" type="submit">
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
