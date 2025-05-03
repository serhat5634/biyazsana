import React from 'react';
import { useNavigate } from 'react-router-dom';

const JetonBasarisiz = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>❌ Ödeme Başarısız</h2>
      <p style={styles.text}>Ödeme sırasında bir sorun oluştu.</p>
      <button onClick={() => navigate('/jeton-al')} style={styles.button}>
        Tekrar Dene
      </button>
    </div>
  );
};

export default JetonBasarisiz;

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff5f5',
  },
  title: {
    fontSize: '28px',
    color: '#c0392b',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '16px',
    color: '#555',
  },
  button: {
    marginTop: '1rem',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
