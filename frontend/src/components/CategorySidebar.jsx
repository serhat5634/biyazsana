import React, { useState, useEffect, useRef } from 'react';

const categories = {
  '🌟 Profesyonel Kariyer İçerikleri': [
    'Özgeçmiş (CV)',
    'LinkedIn Profil Yazımı',
    'Kariyer Hedefi Yazımı',
    'Motivasyon Mektubu (Cover Letter)',
    'İş Teklifi Mektubu',
    'Profesyonel Referans Mektupları',
  ],
  '🚀 Kişisel Marka ve İmaj Yazıları': [
    'Sosyal Medya Biyografisi',
    'Kişisel Web Sitesi "Hakkımda" Metni',
    'Yaratıcı Marka Hikâyesi (Founder Story)',
    'Kişisel Tanıtım Yazısı (Bio)',
  ],
  '🎯 Dijital Ürün & Pazarlama Metinleri': [
    'Ürün Açıklamaları',
    'Marka Sloganı ve Motto',
    'Reklam & Pazarlama Metni',
    'Satış Mektubu / Satış E-postası',
    'Sosyal Medya Reklam Metinleri',
    'Landing Page (Açılış Sayfası) Metni',
  ],
  '✨ Sosyal Medya İçerikleri': [
    'Sosyal Medya Takvimi',
    'Tweet Önerileri',
    'Instagram Gönderi / Hikâye',
    'TikTok & Reels Metinleri',
    'Topluluk Yorum Metinleri',
  ],
  '🖊️ Eğitim & Akademik Yazılar': [
    'Sunum İçeriği',
    'Eğitim Planı & Metni',
    'Online Kurs Modülü',
    'Akademik Özgeçmiş',
    'Akademik Başvuru / Burs Mektubu',
    'Tez Özeti / Ödev Özeti',
  ],
  '📢 Yaratıcı & Eğlenceli Yazılar': [
    'Blog Yazısı (SEO)',
    'YouTube Başlık & Açıklama',
    'Podcast Bölüm Açıklamaları',
    'Clickbait Başlık Önerileri',
    'Hikâye, Şiir ve Sanatsal Yazı',
    'Film, Oyun, Kitap Tanıtımı',
  ],
  '🏢 Kurumsal / İşletme Metinleri': [
    'Kurumsal "Hakkımızda" Metni',
    'İş İlanı Yazımı',
    'Marka Manifestosu',
    'Basın Bülteni',
    'Pitch Deck / Yatırımcı Sunumu',
    'İş E-posta Şablonları',
  ],
  '🧠 BiYazsana Kişisel Yardımcı İçerikleri': [
    'Kişisel Antrenör Metni',
    'Akıllı Diyet Planı',
    'Günlük Moral Mesajı',
    'Günlük İlham Önerisi',
  ],
  '🔱 Marka Tanıtımı': ['Marka Tanıtım Sunumu'],
};

const CategorySidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}) => {
  const [openCategory, setOpenCategory] = useState(selectedCategory);
  const categoryRefs = useRef({});

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
    setSelectedCategory(category);
    setSelectedSubcategory(categories[category][0]);
  };

  useEffect(() => {
    if (openCategory && categoryRefs.current[openCategory]) {
      categoryRefs.current[openCategory].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openCategory]);

  return (
    <div style={styles.sidebar}>
      {Object.entries(categories).map(([category, subcategories]) => (
        <div
          key={category}
          style={styles.categoryCard}
          ref={(el) => (categoryRefs.current[category] = el)}
        >
          <div
            onClick={() => toggleCategory(category)}
            style={{
              ...styles.categoryTitle,
              backgroundColor: openCategory === category ? '#e0f8f5' : '#ffffff',
            }}
          >
            <span>{category}</span>
            <span>{openCategory === category ? '▲' : '▼'}</span>
          </div>

          {openCategory === category && (
            <ul style={styles.subcategoryList}>
              {subcategories.map((subcat) => (
                <li
                  key={subcat}
                  onClick={() => setSelectedSubcategory(subcat)}
                  style={{
                    ...styles.subcategoryItem,
                    backgroundColor: selectedSubcategory === subcat ? '#d0f3ef' : '#f2f2f2',
                    color: selectedSubcategory === subcat ? '#009e8f' : '#333',
                  }}
                >
                  {subcat}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;

const styles = {
  sidebar: {
    width: '100%',
    maxWidth: '320px',
    padding: '1.2rem',
    borderRight: '1px solid #eee',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#f3fbfa',
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc #f3fbfa',
  },
  categoryCard: {
    marginBottom: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    padding: '10px',
  },
  categoryTitle: {
    color: '#009e8f',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  subcategoryList: {
    listStyle: 'none',
    paddingLeft: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '10px',
  },
  subcategoryItem: {
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.2s',
  },
};
