import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logoSection}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="BiYazsana Logo" style={styles.logo} />
          <span style={styles.title}>BiYazsana</span>
        </div>

        {user && (
          <div style={styles.welcomeContainer}>
            👋 <span style={{ fontWeight: 'bold' }}>{user.name}</span>, hoş geldin!
            <span style={{ marginLeft: '10px', color: '#00bfa5', fontWeight: 'bold' }}>
              🪙 {user.tokens} Jeton
            </span>
          </div>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={() => navigate('/yazi')}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00796B')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#009688')}
        >
          🏠 Anasayfa
        </button>

        <button
          onClick={() => navigate('/reklam')}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#009e8f')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00bfa5')}
        >
          🚀 Reklam Ver
        </button>

        <button
          onClick={() => navigate('/mesajlarim')}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00897B')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00bfa5')}
        >
          📬 Mesajlarım
        </button>

        <button
          onClick={() => navigate('/jeton-al')}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196f3')}
        >
          💳 Jeton Al
        </button>

        {user && (
          <button
            onClick={handleLogout}
            style={{ ...styles.button, backgroundColor: '#f44336' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
          >
            🚪 Çıkış Yap
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    height: '38px',
    marginRight: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#00b3b3',
  },
  welcomeContainer: {
    marginTop: '4px',
    fontSize: '14px',
    color: '#444',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  button: {
    backgroundColor: '#00bfa5',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
