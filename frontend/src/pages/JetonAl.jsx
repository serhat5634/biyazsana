import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JetonAl = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const packages = [
    { id: 1, jeton: 3, price: 42 },
    { id: 2, jeton: 5, price: 70 },
    { id: 3, jeton: 10, price: 130 },
    { id: 4, jeton: 20, price: 240 },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Kullanıcı alınamadı');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handlePurchase = async (paket) => {
    try {
      const res = await axios.post('/api/paytr/create-token', {
        email: user.email,
        amount: paket.price,
        userId: user._id,
        jetonAdet: paket.jeton,
      });

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.paytr.com/odeme';

      for (const key in res.data.tokenParams) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = res.data.tokenParams[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit(); // 🔁 PayTR ödeme sayfasına yönlendirir
    } catch (err) {
      console.error('❌ PayTR formu oluşturulamadı:', err);
      alert('Ödeme başlatılamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>🎁 Jeton Satın Al</div>
      <div style={styles.grid}>
        {packages.map((p) => (
          <div key={p.id} style={styles.card}>
            <h3>{p.jeton} Jeton</h3>
            <p>{p.price} TL</p>
            <button style={styles.button} onClick={() => handlePurchase(p)}>
              Satın Al
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JetonAl;

const styles = {
  container: {
    padding: '3rem 1rem',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    marginBottom: '2rem',
    color: '#333'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    width: '200px'
  },
  button: {
    marginTop: '1rem',
    padding: '10px 16px',
    backgroundColor: '#00bfa5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
