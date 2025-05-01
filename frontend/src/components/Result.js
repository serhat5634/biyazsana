import React from 'react';
import { downloadPDF } from '../utils/downloadPDF';

const Result = ({ result }) => {
  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('✅ Metin panoya kopyalandı!');
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'biyazsana-metin.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        background: '#f5ffff',
        padding: '2rem',
        marginTop: '2rem',
        borderRadius: '12px',
        border: '1px solid #c7f2ee',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#222',
        boxShadow: '0 4px 10px rgba(0, 191, 165, 0.05)',
      }}
    >
      <div id="result-content">
        <h3 style={{ color: '#00bfa5', marginBottom: '1rem', fontWeight: 600 }}>
          ✨ BiYazsana Tarafından Oluşturulan Metin:
        </h3>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>{result}</p>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <button
          onClick={handleCopy}
          style={{
            backgroundColor: '#00bfa5',
            color: '#fff',
            padding: '10px 18px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          📋 Kopyala
        </button>

        <button
          onClick={handleDownloadTXT}
          style={{
            backgroundColor: '#ffffff',
            color: '#00bfa5',
            padding: '10px 18px',
            border: '1px solid #00bfa5',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          📥 TXT İndir
        </button>

        <button
          onClick={() => downloadPDF('result-content', 'biyazsana.pdf')}
          style={{
            backgroundColor: '#ffffff',
            color: '#00bfa5',
            padding: '10px 18px',
            border: '1px solid #00bfa5',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          🧾 PDF İndir
        </button>
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          color: '#666',
          marginTop: '1.5rem',
          textAlign: 'center',
        }}
      >
        Bu içerik senin için hazırlandı. <strong style={{ color: '#00bfa5' }}>BiYazsana 💚</strong>
      </p>
    </div>
  );
};

export default Result;
