// utils/prompts/academic.js

const academicPrompts = {
    "Sunum İçeriği": `
  Bir eğitim veya proje sunumu için içerik taslağı oluştur.
  
  🧠 Gereklilikler:
  - Giriş, gelişme ve sonuç bölümleri yer almalı.
  - Konunun amacı, hedef kitlesi ve ana mesajı açık şekilde aktarılmalı.
  - Her bölüm kısa, net ve bilgilendirici şekilde yazılmalı.
  `.trim(),
  
    "Eğitim Planı": `
  Verilen konuya göre bir eğitim planı taslağı oluştur.
  
  🧠 Gereklilikler:
  - Eğitim modülleri başlıklar halinde sıralanmalı.
  - Her modül için hedef ve içeriğe dair kısa açıklamalar yazılmalı.
  - Düzgün yapıda, sade ve uygulanabilir plan önerilmeli.
  `.trim(),
  
    "Kurs Modülü": `
  Online kurslar için içerik modülleri oluştur.
  
  🧠 Gereklilikler:
  - Modül başlıkları sade ve açıklayıcı olmalı.
  - Her modülün amacı, süresi ve içeriği belirtilecek şekilde yazılmalı.
  - Öğrenme çıktıları net ve uygulanabilir olmalı.
  `.trim(),
  
    "Akademik CV": `
  Akademik kariyere yönelik profesyonel bir özgeçmiş hazırla.
  
  🧠 Gereklilikler:
  - Yayınlar, konferanslar, araştırma projeleri gibi detaylar vurgulanmalı.
  - Dil resmi, sade ve teknik olmalı.
  - Düz yazı formatında, başlıksız ve paragraf düzenli şekilde sunulmalı.
  `.trim(),
  
    "Akademik Başvuru": `
  Burs veya yüksek lisans/doktora başvurusu için niyet mektubu yaz.
  
  🧠 Gereklilikler:
  - Kişisel motivasyon, hedefler ve akademik geçmiş özetlenmeli.
  - Başvuru yapılan programa uygunluk vurgulanmalı.
  - Saygılı, vizyoner ve resmi bir ton tercih edilmeli.
  `.trim(),
  
    "Tez Özeti / Ödev Özeti": `
  Bir tez veya ödev konusuna yönelik kısa bir özet yazısı oluştur.
  
  🧠 Gereklilikler:
  - Amaç, yöntem ve sonuç bölümleri kısaca özetlenmeli.
  - Bilimsel dil tercih edilmeli.
  - Yazı en fazla 250-300 kelime arasında olmalı.
  `.trim()
  };
  
  module.exports = academicPrompts;
  