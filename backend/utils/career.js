// utils/prompts/career.js

const careerPrompts = {
    "Özgeçmiş (CV)": `
  Yalnızca verilen bilgilerle, profesyonel, özgün ve tam uzunlukta bir özgeçmiş (CV) oluştur.
  
  CV şu bölümlerden oluşmalı:
  1. Kişisel Bilgiler
  2. Eğitim Bilgileri
  3. İş Deneyimleri
  4. Teknik Yetenekler
  5. Dil Bilgisi
  6. Sertifikalar
  7. Kariyer Hedefi
  8. Referanslar
  
  🧠 İçerik Gereklilikleri:
  - Tüm yazılar ben diliyle yazılsın ama profesyonel ve güven veren bir dil kullanılsın.
  - Her bölümde minimum 2-3 cümlelik açıklamalar yapılsın. Özellikle deneyim ve kariyer hedefi detaylı olsun.
  - Verilmeyen bilgi varsa o bölüm atlanabilir veya “Bilgi verilmedi.” denilebilir.
  - Madde işareti, emoji, tablo, markdown ya da başlık stili kullanılmasın.
  - Format: Düz yazı şeklinde, Word belgesine yapıştırıldığında düzen bozulmadan aktarılabilecek sadelikte olsun.
  - CV doğrudan başvuru dosyasına dönüştürülebilecek yapıda olmalı.
  - Uydurma içerik oluşturma, sadece verilen verilerle yaz.
  `.trim(),
  
    "LinkedIn Profil Yazımı": `
  LinkedIn profili için profesyonel, güven veren ve etkileyici bir tanıtım metni oluştur.
  
  🧠 Gereklilikler:
  - Ben dili kullanılmalı.
  - Mesleki deneyimler, yetenekler ve hedefler öne çıkarılmalı.
  - Paragraflar kısa ve akıcı olmalı.
  - Network oluşturmaya uygun, kendinden emin bir ton tercih edilmeli.
  - Samimi ama aşırıya kaçmayan profesyonel denge korunmalı.
  `.trim(),
  
    "Kariyer Hedefi Yazımı": `
  Başvuru dosyalarında kullanılacak kariyer hedefi yazısı oluştur.
  
  🧠 Gereklilikler:
  - Ben diliyle yazılmalı.
  - Hedeflenen pozisyon açıkça belirtilmeli.
  - Kısa ve net paragraflarla hedefler tanımlanmalı.
  - Güçlü yönler ve bu hedefe katkı sağlayacak yetenekler vurgulanmalı.
  `.trim(),
  
    "Motivasyon Mektubu": `
  İş veya akademik başvurular için özgün ve etkileyici bir motivasyon mektubu hazırla.
  
  🧠 Gereklilikler:
  - Giriş, gelişme ve sonuç bölümleri net olmalı.
  - Kişinin başvuruya olan ilgisi ve motivasyonu açıklanmalı.
  - Deneyim ve beceriler başvuruya uygun şekilde yansıtılmalı.
  - Kapanışta teşekkür ve iletişim isteği belirtilmeli.
  `.trim(),
  
    "İş Teklifi Mektubu": `
  Bir çalışana ya da iş ortaklığı teklif edilen kişiye yönelik resmi iş teklifi metni oluştur.
  
  🧠 Gereklilikler:
  - Teklif edilen pozisyon, sorumluluklar ve avantajlar net şekilde açıklanmalı.
  - Dil resmi ve saygılı olmalı.
  - Son paragrafta iletişim bilgisi veya geri dönüş beklentisi bulunmalı.
  `.trim(),
  
    "Profesyonel Referans Mektupları": `
  Bir aday için kurumsal referans mektubu hazırla.
  
  🧠 Gereklilikler:
  - Üçüncü şahıs ağzı kullanılmalı (örneğin "Kendisini üç yıldır tanıyorum...").
  - Adayın yetkinlikleri, çalışma disiplini ve kişisel özellikleri örneklerle vurgulanmalı.
  - Tarafsız, gerçekçi ve destekleyici bir üslup kullanılmalı.
  `.trim()
  };
  
  module.exports = careerPrompts;
  