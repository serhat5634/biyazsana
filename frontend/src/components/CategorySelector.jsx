import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'career',
    title: '👔 Profesyonel Kariyer İçerikleri',
    description: 'CV, LinkedIn, Motivasyon Mektubu ve daha fazlası',
  },
  {
    id: 'personal-branding',
    title: '💼 Kişisel Marka & Bio',
    description: 'Biyografi, kişisel tanıtım ve marka hikâyeleri',
  },
  {
    id: 'digital-marketing',
    title: '📢 Dijital Ürün & Pazarlama',
    description: 'Ürün açıklamaları, reklam metinleri, satış içerikleri',
  },
  {
    id: 'social-media',
    title: '📱 Sosyal Medya İçerikleri',
    description: 'Gönderiler, story metinleri, içerik takvimleri',
  },
  {
    id: 'education',
    title: '🎓 Eğitim & Akademik Yazılar',
    description: 'Sunumlar, tez özetleri, akademik CV ve başvurular',
  },
  {
    id: 'creative',
    title: '🎨 Yaratıcı & Eğlenceli Yazılar',
    description: 'Şiir, hikâye, blog ve eğlenceli içerikler',
  },
  {
    id: 'corporate',
    title: '🏢 Kurumsal / İşletme Metinleri',
    description: 'Hakkımızda, basın bülteni, iş ilanı metinleri',
  },
  {
    id: 'ai-helper',
    title: '🤖 AI Destekli Kişisel Asistan',
    description: 'Diyet planı, günlük öneriler, motivasyon mesajları',
  },
  {
    id: 'brand-showcase',
    title: '🔱 Marka Tanıtımı',
    description: 'Markan için tanıtım sunumu, vizyon ve misyon yazımı',
  },
];

const CategorySelector = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => navigate(`/category/${category.id}`)}
          className="bg-white rounded-2xl shadow-lg p-5 border hover:bg-gray-50 hover:shadow-xl transition-transform cursor-pointer transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {category.title}
          </h2>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
