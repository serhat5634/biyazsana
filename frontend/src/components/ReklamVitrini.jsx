import React, { useEffect, useState } from 'react';
import axios from '../axios'; // ✅ merkezi axios dosyası kullanılıyor
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaFacebook,
  FaGlobe,
} from 'react-icons/fa';
import './ReklamVitrini.css';

const ReklamVitrini = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('/ads'); // ✅ Güncellendi ve netleştirildi

        // 🔥 Sadece son 3 gün içinde oluşturulan reklamları filtrele
        const now = new Date();
        const üçGünÖnce = new Date();
        üçGünÖnce.setDate(now.getDate() - 3);

        const filtreliReklamlar = res.data.filter(
          (ad) => new Date(ad.createdAt) >= üçGünÖnce
        );

        setAds(filtreliReklamlar);
      } catch (err) {
        console.error('❌ Reklamları çekerken hata:', err.message);
      }
    };

    fetchAds();
  }, []);

  const socialIcons = {
    instagram: FaInstagram,
    twitter: FaTwitter,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    linkedin: FaLinkedin,
    facebook: FaFacebook,
  };

  return (
    <div className="reklam-container">
      <h2 className="reklam-title">📢 Ziyaretçi Reklamları</h2>

      {ads.length > 0 ? (
        <div className="reklam-grid">
          {ads.map((ad) => (
            <div key={ad._id} className="reklam-card">
              <h3>{ad.reklamBasligi}</h3>

              <span className={`reklam-badge ${ad.reklamTuru}`}>
                {ad.reklamTuru === 'product' ? '🌐 Ürün / Site' : '📱 Sosyal Medya'}
              </span>

              <p>{ad.aciklama || '–'}</p>

              <p className="reklam-date">
                📅 Yayınlandı:{' '}
                {new Date(ad.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              {ad.reklamTuru === 'product' && ad.link && (
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reklam-link"
                >
                  <FaGlobe /> Siteyi Ziyaret Et
                </a>
              )}

              {ad.reklamTuru === 'social' && (
                <div className="social-links">
                  {Object.entries(socialIcons).map(([key, Icon]) =>
                    ad[key] ? (
                      <a
                        key={key}
                        href={
                          ['youtube', 'linkedin', 'facebook'].includes(key)
                            ? ad[key]
                            : `https://${key}.com/${ad[key]}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon /> @{ad[key]}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="reklam-empty">Henüz yayınlanan bir reklam yok!</p>
      )}
    </div>
  );
};

export default ReklamVitrini;
