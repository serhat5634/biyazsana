import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // ✅ Merkezi Axios bağlantısı

const Jetonlarim = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token'); // ✅ Artık sessionStorage kullanıyoruz
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('/users/me'); // token interceptor'dan otomatik eklenecek
        setUser(res.data);
      } catch (err) {
        console.error('❌ Kullanıcı bilgisi alınamadı:', err.message);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p style={{ padding: '2rem' }}>⏳ Yükleniyor...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🪙 Jeton Bilgilerin</h2>
        <p style={styles.jeton}>
          Toplam Jeton: <strong>{user.tokens}</strong>
        </p>
        <p style={styles.info}>
          Jeton ile özel yazılar oluşturabilir, reklam verebilirsin.
          Jetonun bittiğinde <strong>Jeton Al</strong> butonunu kullanabilirsin.
        </p>
        <button style={styles.button} onClick={() => navigate('/jeton-al')}>
          ➕ Jeton Satın Al
        </button>
      </div>
    </div>
  );
};

export default Jetonlarim;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 1rem',
    backgroundColor: '#f0fbf9',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '1rem',
    color: '#00796b',
  },
  jeton: {
    fontSize: '20px',
    marginBottom: '1rem',
    color: '#00bfa5',
  },
  info: {
    fontSize: '15px',
    marginBottom: '2rem',
    color: '#555',
  },
  button: {
    backgroundColor: '#00bfa5',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
