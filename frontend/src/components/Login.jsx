import React, { useState } from 'react';
import axios from 'axios';
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
    const url = isRegister ? '/api/users/register' : '/api/auth/login';

    try {
      const res = await axios.post(url, form);
      localStorage.setItem('token', res.data.token);
      navigate('/yazi');
    } catch (error) {
      setError(error.response?.data?.msg || 'Bir hata oluştu.');
    }
  };

  const googleLogin = () => {
    window.open('http://localhost:5000/api/auth/google', '_self'); // ✅ DOĞRU YÖNLENDİRME
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
              onChange={handleChange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="E-posta Adresiniz"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Şifreniz"
            required
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
