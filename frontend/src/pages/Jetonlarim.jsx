import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';  // ✅ Merkezi Axios bağlantısı kullanıldı

const Jetonlarim = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('/users/me', {  // ✅ Axios baseURL ile '/api' eklendi
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('❌ Kullanıcı verisi alınamadı:', err.message);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p style={{ padding: '2rem' }}>Yükleniyor...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🪙 Jeton Bilgilerin</h2>
        <p style={styles.jeton}>
          Toplam Jeton: <strong>{user.tokens}</strong>
        </p>
        <p style={styles.info}>
          Jetonunla özel yazılar oluşturabilirsin. Jetonun biterse yenisini alabilirsin.
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
    backgroundColor: '#f5f7fa',
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
    color: '#333',
  },
  jeton: {
    fontSize: '20px',
    marginBottom: '1rem',
    color: '#009688',
  },
  info: {
    fontSize: '15px',
    marginBottom: '2rem',
    color: '#666',
  },
  button: {
    backgroundColor: '#00bfa5',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};
