const formFieldsBySubcategory = {
  // 🌟 Profesyonel Kariyer İçerikleri
  "Özgeçmiş (CV)": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "job", placeholder: "Meslek", required: true },
    { name: "skills", placeholder: "Yetenekler (virgülle)", required: true },
    { name: "education", placeholder: "Eğitim Durumu", required: false },
    { name: "experience", placeholder: "Deneyim Süresi", required: false },
    { name: "languages", placeholder: "Dil Bilgisi", required: false }, // ✅ eklendi
    { name: "certifications", placeholder: "Sertifikalar", required: false }, // ✅ eklendi
    { name: "references", placeholder: "Referanslar", required: false }, // ✅ eklendi
    { name: "target", placeholder: "Kariyer Hedefi", required: false },
    { name: "location", placeholder: "Şehir", required: false },
    { name: "email", placeholder: "E-posta", required: false },
    { name: "phone", placeholder: "Telefon", required: false },
  ],
  "LinkedIn Profil Yazımı": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "job", placeholder: "Meslek", required: true },
    { name: "skills", placeholder: "Yetenekler", required: true },
    { name: "experience", placeholder: "Deneyim", required: false },
    { name: "target", placeholder: "Hedef", required: false },
  ],
  "Kariyer Hedefi Yazımı": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "job", placeholder: "Meslek", required: true },
    { name: "target", placeholder: "Hedeflenen Pozisyon", required: true },
    { name: "additionalInfo", placeholder: "Kariyer Amacı", required: false },
  ],
  "Motivasyon Mektubu (Cover Letter)": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "job", placeholder: "Başvuru Pozisyonu", required: true },
    { name: "skills", placeholder: "Yetenekler", required: false },
    { name: "experience", placeholder: "Deneyim", required: false },
    { name: "target", placeholder: "Kariyer Hedefi", required: false },
  ],
  "İş Teklifi Mektubu": [
    { name: "name", placeholder: "Adınız", required: true },
    { name: "additionalInfo", placeholder: "İş / Proje Açıklaması", required: true },
  ],
  "Profesyonel Referans Mektupları": [
    { name: "name", placeholder: "Referans Alan Kişi", required: true },
    { name: "job", placeholder: "Pozisyon", required: false },
    { name: "skills", placeholder: "Yetkinlikler", required: false },
    { name: "additionalInfo", placeholder: "Referans Verenin Bilgileri", required: false },
  ],

  // 🚀 Kişisel Marka & İmaj Yazıları
  "Sosyal Medya Biyografisi": [
    { name: "name", placeholder: "Kullanıcı Adı", required: true },
    { name: "job", placeholder: "Alan / Meslek", required: false },
    { name: "additionalInfo", placeholder: "Tarz / Hedef Kitle", required: false },
  ],
  'Kişisel Web Sitesi "Hakkımda" Metni': [
    { name: "name", placeholder: "Adınız", required: true },
    { name: "additionalInfo", placeholder: "Kendinizi Kısaca Tanıtın", required: true },
  ],
  "Yaratıcı Marka Hikâyesi (Founder Story)": [
    { name: "name", placeholder: "Kurucu Adı", required: true },
    { name: "job", placeholder: "Sektör", required: false },
    { name: "additionalInfo", placeholder: "Marka Hikayesi", required: true },
  ],
  "Kişisel Tanıtım Yazısı (Bio)": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "additionalInfo", placeholder: "Kısa Tanıtım", required: true },
  ],

  // 🎯 Dijital Ürün & Pazarlama Metinleri
  "Ürün Açıklamaları": [
    { name: "name", placeholder: "Ürün Adı", required: true },
    { name: "job", placeholder: "Sektör", required: false },
    { name: "additionalInfo", placeholder: "Ürün Özellikleri", required: true },
  ],
  "Marka Sloganı ve Motto": [
    { name: "name", placeholder: "Marka Adı", required: true },
    { name: "additionalInfo", placeholder: "Tarz, Amaç, Kitle", required: true },
  ],
  "Reklam & Pazarlama Metni": [
    { name: "name", placeholder: "Ürün veya Marka", required: true },
    { name: "additionalInfo", placeholder: "Mesaj / Tema", required: true },
  ],
  "Satış Mektubu / Satış E-postası": [
    { name: "name", placeholder: "Satıcı Adı", required: true },
    { name: "additionalInfo", placeholder: "Hedef Ürün ve Müşteri", required: true },
  ],
  "Sosyal Medya Reklam Metinleri": [
    { name: "name", placeholder: "Ürün / Marka", required: true },
    { name: "additionalInfo", placeholder: "Reklam Konusu", required: true },
  ],
  "Landing Page (Açılış Sayfası) Metni": [
    { name: "name", placeholder: "Site / Ürün Adı", required: true },
    { name: "additionalInfo", placeholder: "Öne Çıkan Özellikler", required: true },
  ],

  // ✨ Sosyal Medya İçerikleri
  "Sosyal Medya Takvimi": [
    { name: "name", placeholder: "Hesap / Marka", required: true },
    { name: "additionalInfo", placeholder: "Tema", required: true },
  ],
  "Tweet Önerileri": [
    { name: "name", placeholder: "Kullanıcı Adı", required: true },
    { name: "additionalInfo", placeholder: "Tweet Teması", required: true },
  ],
  "Instagram Gönderi / Hikâye": [
    { name: "name", placeholder: "Hesap Adı", required: true },
    { name: "additionalInfo", placeholder: "Gönderi Konusu", required: true },
  ],
  "TikTok & Reels Metinleri": [
    { name: "name", placeholder: "Hesap / Ürün", required: true },
    { name: "additionalInfo", placeholder: "Video Teması", required: true },
  ],
  "Topluluk Yorum Metinleri": [
    { name: "name", placeholder: "Topluluk Adı", required: true },
    { name: "additionalInfo", placeholder: "Yorum Konusu", required: true },
  ],

  // 🖊️ Eğitim & Akademik Yazılar
  "Sunum İçeriği": [
    { name: "name", placeholder: "Hazırlayan", required: true },
    { name: "job", placeholder: "Sunum Başlığı", required: true },
    { name: "additionalInfo", placeholder: "Sunumun Amacı", required: true },
  ],
  "Eğitim Planı & Metni": [
    { name: "name", placeholder: "Eğitici", required: true },
    { name: "job", placeholder: "Konu", required: true },
    { name: "education", placeholder: "Seviye", required: true },
  ],
  "Online Kurs Modülü": [
    { name: "name", placeholder: "Kurs Adı", required: true },
    { name: "additionalInfo", placeholder: "Kurs İçeriği", required: true },
  ],
  "Akademik Özgeçmiş": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "education", placeholder: "Eğitim", required: true },
    { name: "experience", placeholder: "Deneyim", required: true },
  ],
  "Akademik Başvuru / Burs Mektubu": [
    { name: "name", placeholder: "Ad Soyad", required: true },
    { name: "job", placeholder: "Alan", required: true },
    { name: "additionalInfo", placeholder: "Neden Başvurduğun", required: true },
  ],
  "Tez Özeti / Ödev Özeti": [
    { name: "name", placeholder: "Öğrenci Adı", required: true },
    { name: "job", placeholder: "Konu", required: true },
    { name: "additionalInfo", placeholder: "Özet", required: true },
  ],

  // 🎨 Yaratıcı & Eğlenceli Yazılar
  "Blog Yazısı (SEO)": [
    { name: "name", placeholder: "Yazar", required: false },
    { name: "additionalInfo", placeholder: "Konu / Anahtar Kelime", required: true },
  ],
  "YouTube Başlık & Açıklama": [
    { name: "name", placeholder: "Kanal Adı", required: false },
    { name: "additionalInfo", placeholder: "Video Konusu", required: true },
  ],
  "Podcast Bölüm Açıklamaları": [
    { name: "name", placeholder: "Podcast Adı", required: false },
    { name: "additionalInfo", placeholder: "Bölüm Özeti", required: true },
  ],
  "Clickbait Başlık Önerileri": [
    { name: "additionalInfo", placeholder: "İçerik Konusu", required: true },
  ],
  "Hikâye, Şiir ve Sanatsal Yazı": [
    { name: "additionalInfo", placeholder: "Tema veya Hikaye", required: true },
  ],
  "Film, Oyun, Kitap Tanıtımı": [
    { name: "additionalInfo", placeholder: "İnceleme Konusu", required: true },
  ],

  // 🏢 Kurumsal / İşletme Metinleri
  'Kurumsal "Hakkımızda" Metni': [
    { name: "name", placeholder: "Firma Adı", required: true },
    { name: "job", placeholder: "Sektör", required: true },
    { name: "additionalInfo", placeholder: "Vizyon / Amaç", required: true },
  ],
  "İş İlanı Yazımı": [
    { name: "name", placeholder: "Firma", required: true },
    { name: "job", placeholder: "Pozisyon", required: true },
    { name: "additionalInfo", placeholder: "Detaylar", required: true },
  ],
  "Marka Manifestosu": [
    { name: "name", placeholder: "Marka", required: true },
    { name: "additionalInfo", placeholder: "Değerler / Misyon", required: true },
  ],
  "Basın Bülteni": [
    { name: "name", placeholder: "Şirket / Ürün", required: true },
    { name: "additionalInfo", placeholder: "Basın Konusu", required: true },
  ],
  "Pitch Deck / Yatırımcı Sunumu": [
    { name: "name", placeholder: "Girişim / Marka", required: true },
    { name: "job", placeholder: "Sektör", required: true },
    { name: "additionalInfo", placeholder: "Öne Çıkan Noktalar", required: true },
  ],
  "İş E-posta Şablonları": [
    { name: "additionalInfo", placeholder: "Konu / Mesaj Özeti", required: true },
  ],

 // 🧠 BiYazsana Kişisel Yardımcı İçerikleri (Güncellenmiş)
"Akıllı Diyet Planı": [
  { name: "name", placeholder: "Kullanıcı Adı", required: true },
  { name: "age", placeholder: "Yaş", required: true },
  { name: "gender", placeholder: "Cinsiyet", required: true },
  { name: "weight", placeholder: "Kilo (kg)", required: true },
  { name: "height", placeholder: "Boy (cm)", required: true },
  {
    name: "activity",
    placeholder: "Günlük Aktivite Seviyesi (Az / Orta / Yüksek)",
    required: true,
  },
  {
    name: "goal",
    placeholder: "Sağlık Durumu / Hedef",
    required: true,
  },
],
"Kişisel Antrenör Metni": [
  { name: "name", placeholder: "Kullanıcı Adı", required: true },
  { name: "additionalInfo", placeholder: "Spor Tarzı / Hedef", required: true },
],
"Günlük Moral Mesajı": [
  { name: "name", placeholder: "İsim (opsiyonel)", required: false },
  { name: "additionalInfo", placeholder: "Tema (opsiyonel)", required: false },
],
"Günlük İlham Önerisi": [
  { name: "name", placeholder: "İsim", required: false },
  { name: "additionalInfo", placeholder: "İlgi Alanı", required: false },
],


  // 🔱 Marka Tanıtımı
  "Marka Tanıtım Sunumu": [
    { name: "name", placeholder: "Marka Adı", required: true },
    { name: "job", placeholder: "Sektör", required: true },
    { name: "additionalInfo", placeholder: "Ürün / Hizmet Tanımı", required: true },
  ],
};

export default formFieldsBySubcategory;
