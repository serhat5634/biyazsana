import React from 'react';

// 🪙 Jeton bedeli tablosu (güncel)
const jetonBedelleri = {
  // 🌟 Profesyonel Kariyer İçerikleri
  'Özgeçmiş (CV)': 5,
  'LinkedIn Profil Yazımı': 4,
  'Kariyer Hedefi Yazımı': 3,
  'Motivasyon Mektubu (Cover Letter)': 3,
  'İş Teklifi Mektubu': 2,
  'Profesyonel Referans Mektupları': 3,

  // 🚀 Kişisel Marka ve İmaj Yazıları
  'Sosyal Medya Biyografisi': 2,
  'Kişisel Web Sitesi "Hakkımda" Metni': 3,
  'Yaratıcı Marka Hikâyesi (Founder Story)': 3,
  'Kişisel Tanıtım Yazısı (Bio)': 2,

  // 🎯 Dijital Ürün & Pazarlama Metinleri
  'Ürün Açıklamaları': 3,
  'Marka Sloganı ve Motto': 2,
  'Reklam & Pazarlama Metni': 3,
  'Satış Mektubu / Satış E-postası': 3,
  'Sosyal Medya Reklam Metinleri': 2,
  'Landing Page (Açılış Sayfası) Metni': 4,

  // ✨ Sosyal Medya İçerikleri
  'Sosyal Medya Takvimi': 2,
  'Tweet Önerileri': 2,
  'Instagram Gönderi / Hikâye': 2,
  'TikTok & Reels Metinleri': 2,
  'Topluluk Yorum Metinleri': 2,

  // 🖊️ Eğitim & Akademik Yazılar
  'Sunum İçeriği': 3,
  'Eğitim Planı & Metni': 3,
  'Online Kurs Modülü': 4,
  'Akademik Özgeçmiş': 4,
  'Akademik Başvuru / Burs Mektubu': 4,
  'Tez Özeti / Ödev Özeti': 3,

  // 📢 Yaratıcı & Eğlenceli Yazılar
  'Blog Yazısı (SEO)': 3,
  'YouTube Başlık & Açıklama': 2,
  'Podcast Bölüm Açıklamaları': 2,
  'Clickbait Başlık Önerileri': 2,
  'Hikâye, Şiir ve Sanatsal Yazı': 3,
  'Film, Oyun, Kitap Tanıtımı': 2,

  // 🏢 Kurumsal / İşletme Metinleri
  'Kurumsal "Hakkımızda" Metni': 3,
  'İş İlanı Yazımı': 2,
  'Marka Manifestosu': 3,
  'Basın Bülteni': 3,
  'Pitch Deck / Yatırımcı Sunumu': 4,
  'İş E-posta Şablonları': 2,

  // 🧠 BiYazsana Kişisel Yardımcı İçerikleri
  'Kişisel Antrenör Metni': 2,
  'Akıllı Diyet Planı': 2,
  'Günlük Moral Mesajı': 2,
  'Günlük İlham Önerisi': 2,

  // 🔱 Marka Tanıtımı
  'Marka Tanıtım Sunumu': 3,
};

const CategoryForm = ({ fields, formData, handleChange, handleSubmit, loading }) => {
  const subCategory = formData.subCategory || '';
  const jeton = jetonBedelleri[subCategory] || 1;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
    >
      {/* 🪙 Jeton Bilgilendirmesi */}
      {subCategory && (
        <div className="mb-6 bg-yellow-100 text-yellow-800 font-semibold p-4 rounded-lg border border-yellow-300">
          🪙 Bu işlem <span className="text-pink-600">{jeton}</span> jeton harcar.
        </div>
      )}

      {fields.map((field) => {
        const FieldComponent = field.type === 'textarea' ? 'textarea' : 'input';

        return (
          <FieldComponent
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            rows={field.type === 'textarea' ? 4 : undefined}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500"
          />
        );
      })}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-shadow duration-200 ${
          loading
            ? 'bg-gray-400 cursor-wait'
            : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500 shadow-sm hover:shadow-md'
        }`}
      >
        {loading ? '⏳ Yükleniyor...' : '✨ Yaz Bana!'}
      </button>
    </form>
  );
};

export default CategoryForm;
