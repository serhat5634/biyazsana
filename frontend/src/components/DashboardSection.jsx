// components/DashboardSection.jsx
import React from 'react';

const DashboardSection = ({ dailyText }) => {
  return (
    <div style={{
      background: '#f4fcff',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid #cce7f4',
      marginTop: '2rem'
    }}>
      <h2 style={{ color: '#0077b6' }}>📌 Günün Yazısı</h2>
      <p style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>
        {dailyText || 'Bugün için özel bir içerik henüz seçilmedi.'}
      </p>
      <button style={{
        marginTop: '1rem',
        padding: '10px 20px',
        backgroundColor: '#00b4d8',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}>
        🔓 Jeton ile Yazıyı Aç
      </button>
    </div>
  );
};

export default DashboardSection;
