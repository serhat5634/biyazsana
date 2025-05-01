// utils/prompts/corporate.js

const corporatePrompts = {
  "Kurumsal Hakkımızda": `
Bir işletme veya markanın "Hakkımızda" sayfası için kurumsal tanıtım metni oluştur.

🧠 Gereklilikler:
- "Biz" dili kullanılmalı.
- Firma vizyonu, misyonu ve hizmet kapsamı belirtilmeli.
- Değer odaklı ve samimi ama profesyonel bir ton tercih edilmeli.
- Paragraflar sade, net ve güven veren biçimde yazılmalı.
`.trim(),

  "İş İlanı": `
Verilen pozisyona uygun profesyonel bir iş ilanı metni oluştur.

🧠 Gereklilikler:
- Pozisyon başlığı, görev tanımı ve sorumluluklar net şekilde açıklanmalı.
- Aranan nitelikler ve başvuru süreci belirtilmeli.
- İnsan kaynakları odaklı bir dille yazılmalı.
- Açık, anlaşılır ve motive edici olmalı.
`.trim(),

  "Basın Bülteni": `
Bir ürün lansmanı, etkinlik veya önemli duyuru için basın bülteni yazısı oluştur.

🧠 Gereklilikler:
- Olayın ne olduğu, nerede, ne zaman gerçekleştiği açıklanmalı.
- Kurum adı ve açıklamanın amacı vurgulanmalı.
- Medya için uygun, tarafsız ve bilgilendirici bir ton kullanılmalı.
`.trim(),

  "Marka Manifestosu": `
Bir markanın değerlerini ve dünya görüşünü yansıtan güçlü bir manifesto oluştur.

🧠 Gereklilikler:
- İlham verici, motive edici ve vizyoner bir anlatım kullanılmalı.
- "Biz" dili ve güçlü kavramlar tercih edilmeli.
- 3 kısa paragraf ideal yapıdır.
- Marka kimliği ve toplumsal duruş net olarak aktarılmalı.
`.trim(),

  "Pitch Deck / Sunum": `
Yatırımcılara ya da potansiyel iş ortaklarına yönelik kısa sunum metni hazırla.

🧠 Gereklilikler:
- Girişim özeti, sunduğu çözüm, pazar hedefi ve vizyon anlatılmalı.
- 4-5 kısa paragraf içinde sade ama çarpıcı içerik sunulmalı.
- Profesyonel ve ikna edici bir dil kullanılmalı.
`.trim(),

  "İş E-posta Şablonu": `
Profesyonel iletişimde kullanılabilecek iş e-postası şablonu oluştur.

🧠 Gereklilikler:
- Selamlama, ana mesaj ve kapanış bölümleri içermeli.
- Dil kibar, resmi ve net olmalı.
- Gereksiz uzunluktan kaçınılmalı.
- Şablon her sektör için uyarlanabilir yapıda olmalı.
`.trim()
};

module.exports = corporatePrompts;
