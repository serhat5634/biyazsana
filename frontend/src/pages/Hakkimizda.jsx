import React from 'react';
import './Hakkimizda.css';

const Hakkimizda = () => {
  return (
    <div className="hakkimizda-container">
      <h1 className="page-title">📌 Hakkımızda</h1>

      <section className="section">
        <h2>🚀 Biz Kimiz?</h2>
        <p>
          BiYazsana, içerik üretimini herkes için kolaylaştıran yenilikçi bir dijital platformdur. Yapay zekâ destekli çözümlerimizle, kullanıcılarımızın kişisel, profesyonel ve yaratıcı içeriklerini saniyeler içinde üretmelerini sağlıyoruz.
        </p>
      </section>

      <section className="section">
        <h2>🌟 Vizyonumuz & Misyonumuz</h2>
        <p>
          <strong>Vizyonumuz:</strong> Dijital içerik üretimini herkes için erişilebilir ve keyifli hale getirmek, insanlara zamandan tasarruf ettirerek yaratıcılıklarına odaklanma fırsatı sunmak.
        </p>
        <p>
          <strong>Misyonumuz:</strong> Yapay zekâyı kullanarak içerik üretiminde devrim yaratmak ve kullanıcılarımızın potansiyellerini keşfetmelerini kolaylaştırmak.
        </p>
      </section>

      <section className="section">
        <h2>👨‍💻 Kurucularımız</h2>
        <p>
          Platformumuz, WOLVARD ve yapay zekâ uzmanı NERON tarafından geliştirilmiştir. Kurucularımızın vizyonu ve yenilikçi yaklaşımı sayesinde BiYazsana, kısa sürede büyük bir kullanıcı kitlesine ulaşmayı başarmıştır.
        </p>
      </section>

      <section className="section">
        <h2>✨ Değerlerimiz</h2>
        <ul>
          <li><strong>Yaratıcılık:</strong> Kullanıcılarımızın özgün fikirlerini destekliyoruz.</li>
          <li><strong>Şeffaflık:</strong> Kullanıcılarımızla açık iletişim kuruyor ve güven sağlıyoruz.</li>
          <li><strong>İnovasyon:</strong> Sürekli olarak yenileniyor ve gelişiyoruz.</li>
          <li><strong>Kullanıcı Odaklılık:</strong> Kullanıcı deneyimini her zaman ön planda tutuyoruz.</li>
        </ul>
      </section>
    </div>
  );
};

export default Hakkimizda;
