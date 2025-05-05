import React, { useState } from 'react';
import axios from '../axios';

const JetonAl = () => {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState('');

  const paketler = [5, 10, 20, 50]; // Jeton paketleri

  const handlePayment = async () => {
    try {
      const res = await axios.post('/paytr/token', { amount });
      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl; // PayTR sayfasına yönlendir
      } else {
        setMessage('❌ Ödeme bağlantısı oluşturulamadı.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Sunucu hatası. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💳 Jeton Satın Al</h2>
      <p style={styles.desc}>İhtiyacına uygun jeton paketini seçerek işlemini başlatabilirsin.</p>

      <div style={styles.paketGroup}>
        {paketler.map((paket) => (
          <button
            key={paket}
            onClick={() => setAmount(paket)}
            style={{
              ...styles.paketButton,
              backgroundColor: amount === paket ? '#00bfa5' : '#fff',
              color: amount === paket ? '#fff' : '#00bfa5',
              border: '2px solid #00bfa5'
            }}
          >
            {paket} Jeton
          </button>
        ))}
      </div>

      <button onClick={handlePayment} style={styles.payBtn}>
        🚀 Satın Al ({amount} Jeton)
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    textAlign: 'center'
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#00bfa5',
    marginBottom: '1rem'
  },
  desc: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '1.5rem'
  },
  paketGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  paketButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: '100px',
    fontSize: '16px',
    transition: 'all 0.2s ease-in-out'
  },
  payBtn: {
    backgroundColor: '#00bfa5',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  message: {
    marginTop: '1.5rem',
    color: '#f44336'
  }
};

export default JetonAl;
