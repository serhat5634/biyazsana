// utils/prompts/creative.js

const creativePrompts = {
  "Blog Yazısı (SEO)": `
Verilen konuya ve anahtar kelimeye uygun, SEO dostu bir blog yazısı oluştur.

🧠 Gereklilikler:
- Giriş, gelişme ve sonuç şeklinde yapılandırılmalı.
- Anahtar kelime doğal biçimde metne yedirilmeli.
- Her paragraf kısa ve okunabilir olmalı.
- Bilgilendirici ve özgün içerik üretimi esas alınmalı.
`.trim(),

  "YouTube Başlık & Açıklama": `
Bir YouTube videosu için başlık ve açıklama üret.

🧠 Gereklilikler:
- Başlık ilgi çekici, maksimum 60 karakter olacak şekilde kısa ve güçlü olmalı.
- Açıklama videosu özetlemeli, CTA içermeli (örn. abone ol, videoyu beğen).
- Etiket ve link önerisi belirtilebilir.
`.trim(),

  "Podcast Açıklaması": `
Bir podcast bölümü için içerik açıklaması oluştur.

🧠 Gereklilikler:
- Konu, katılımcılar ve temel mesajlar kısa paragraflarla sunulmalı.
- İlgi çekici bir giriş yapılmalı.
- Dil samimi, bilgilendirici ve dinleyiciye hitap eder şekilde olmalı.
`.trim(),

  "Clickbait Başlık": `
Verilen konuya göre tıklanma oranı yüksek 5 clickbait başlık önerisi üret.

🧠 Gereklilikler:
- Başlıklar kısa, dikkat çekici ve merak uyandırıcı olmalı.
- Abartıdan uzak ama çarpıcı ifadeler tercih edilmeli.
- Numara, soru veya sürpriz içeren yapılar kullanılabilir.
`.trim(),

  "Hikâye / Şiir / Sanatsal": `
Verilen temaya göre kısa bir hikâye veya şiir yaz.

🧠 Gereklilikler:
- Dil özgün ve yaratıcı olmalı.
- Hikâye en fazla 300 kelimeyi geçmemeli.
- Temayı yansıtan duygu ve imgeler tercih edilmeli.
- Gereksiz uzatmadan sade anlatım benimsenmeli.
`.trim(),

  "Film, Kitap, Oyun Tanıtımı": `
Belirtilen medya içeriği için kısa tanıtım veya inceleme metni oluştur.

🧠 Gereklilikler:
- Konu, tema, tür ve hedef kitle belirtilmeli.
- Tarafsız ve özgün yorum yapılmalı.
- Dil sade ama etkileyici olmalı.
`.trim()
};

module.exports = creativePrompts;
