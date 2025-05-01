// utils/prompts/marketing.js

const marketingPrompts = {
  "Ürün Açıklamaları": `
Verilen ürün adı ve özelliklerine göre e-ticaret platformları için etkileyici ve açıklayıcı bir ürün tanıtım metni oluştur.

🧠 Gereklilikler:
- Ürün avantajları, kullanım alanı ve temel faydaları net şekilde açıklanmalı.
- Teknik bilgiler varsa sadeleştirilerek anlaşılır biçimde sunulmalı.
- SEO uyumlu, satış odaklı ve profesyonel dille yazılmalı.
- Uydurma bilgi eklenmemeli; yalnızca verilen verilerle oluşturulmalı.
- Dil: Akıcı, güven veren ve sade.
`.trim(),

  "Marka Sloganı ve Motto": `
Verilen marka adı ve hedef kitlesine uygun, kısa ve etkileyici bir slogan/motto üret.

🧠 Gereklilikler:
- 3 ila 7 kelime arasında olmalı.
- Özgün, akılda kalıcı ve marka kimliğini yansıtmalı.
- Mizahi, duygusal ya da profesyonel ton tercih edilebilir.
- Gereksiz kelime tekrarları veya genel geçer ifadelerden kaçınılmalı.
`.trim(),

  "Reklam ve Pazarlama Metni": `
Bir kampanya, ürün veya hizmet için reklam & pazarlama metni üret.

🧠 Gereklilikler:
- Güçlü bir giriş cümlesi ve çağrı (CTA) içermeli.
- Kısa paragraflarla etkileyici ve ikna edici anlatım sunulmalı.
- Duygusal, eğlenceli ya da ciddi ton ihtiyaca göre ayarlanmalı.
- Satışa yönlendiren etkili dil kullanılmalı.
`.trim(),

  "Satış Mektubu / Satış E-postası": `
Potansiyel müşterilere özel olarak hazırlanacak bir satış mektubu/e-postası oluştur.

🧠 Gereklilikler:
- Açılış: Hitap ve dikkat çekici bir cümle ile başlanmalı.
- Gelişme: Ürün/hizmet açıklanmalı ve neden alıcının ihtiyacına uygun olduğu vurgulanmalı.
- Kapanış: Net bir CTA (hemen incele, randevu al, dene vb.) yer almalı.
- Dil: Profesyonel, güvenilir ve samimi.
`.trim(),

  "Sosyal Medya Reklam Metinleri": `
Instagram, TikTok, Twitter gibi sosyal medya platformlarında kullanılabilecek kısa reklam metinleri oluştur.

🧠 Gereklilikler:
- Her bir metin 1-2 cümleyi geçmemeli.
- Hedef kitleye göre mizahi, genç veya kurumsal tonlar seçilmeli.
- CTA önerisi içermeli (örn. Keşfet, Hemen Başla, Şimdi Al).
- Dikkat çekici kelimelerle başlanmalı.
`.trim(),

  "Landing Page (Açılış Sayfası) Metni": `
Bir ürün, uygulama veya hizmet için açılış sayfası metni oluştur.

🧠 Gereklilikler:
- Başlık: İlgi çekici ve hedef odaklı olmalı.
- Alt Başlık: Kullanıcının ne kazanacağını netleştirmeli.
- Açıklama: Ürün/hizmetin temel özellikleri, faydaları ve kullanıcıya sunduğu çözümler vurgulanmalı.
- CTA: Etkileyici bir çağrı içermeli (örn. Hemen Başla, Demo İzle, Kayıt Ol).
- Dil: Dönüştürücü ve net.
`.trim()
};

module.exports = marketingPrompts;
