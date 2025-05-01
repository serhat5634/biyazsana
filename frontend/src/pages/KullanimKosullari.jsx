import React from 'react';
import './KullanimKosullari.css';

const KullanimKosullari = () => (
  <div className="kosullar-container">
    <h1 className="page-title">📜 Kullanım Koşulları</h1>

    <p>
      Bu platformu kullanmadan önce lütfen aşağıdaki kullanım koşullarını dikkatlice okuyunuz. BiYazsana'yı kullanarak, bu şartları kabul etmiş sayılırsınız.
    </p>

    <h2>1. Hizmet Tanımı</h2>
    <p>
      BiYazsana, kullanıcılarına kişisel, akademik ve ticari içerik üretimi için yapay zekâ destekli bir yazım asistanı sunar. Platformumuz üzerinden oluşturulan içerikler tamamen bilgilendirme ve öneri amacı taşır.
    </p>

    <h2>2. Sorumluluk Reddi</h2>
    <p>
      Üretilen içeriklerin doğruluğu ve uygunluğu tamamen kullanıcı sorumluluğundadır. BiYazsana, oluşturulan içeriklerin kullanımından doğabilecek herhangi bir zarardan sorumlu değildir.
    </p>

    <h2>3. Kullanım Sınırlamaları</h2>
    <ul>
      <li>Yasa dışı, nefret söylemi içeren veya etik dışı içerikler üretmek kesinlikle yasaktır.</li>
      <li>Platformun bütünlüğüne zarar verecek herhangi bir teknik müdahale yapılamaz.</li>
      <li>Oluşturulan içeriklerin, başkasına ait olduğu iddia edilerek paylaşılması durumunda sorumluluk kullanıcıya aittir.</li>
    </ul>

    <h2>4. Gizlilik</h2>
    <p>
      Kullanıcılar tarafından girilen bilgiler BiYazsana tarafından saklanmaz, paylaşılmaz ve pazarlanmaz. Gizlilik ile ilgili detaylı bilgiyi <strong>Gizlilik Politikası</strong> sayfamızda bulabilirsiniz.
    </p>

    <h2>5. Değişiklik Hakkı</h2>
    <p>
      BiYazsana, kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Güncellemeler yürürlüğe girdikten sonra platformun kullanılmaya devam edilmesi, yeni şartların kabul edildiği anlamına gelir.
    </p>

    <p className="footer-note">
      📅 Son güncelleme: 14 Nisan 2025
    </p>
  </div>
);

export default KullanimKosullari;
