import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JetonBasarili = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/jetonlarim');
    }, 3000); // 3 saniye sonra yönlendir

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎉 Ödeme Başarılı!</h2>
      <p style={styles.text}>Jetonlar hesabınıza yüklendi.</p>
      <p style={styles.text}>Yönlendiriliyorsunuz...</p>
    </div>
  );
};

export default JetonBasarili;

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0fdfa',
  },
  title: {
    fontSize: '28px',
    color: '#009688',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '16px',
    color: '#333',
  }
};
