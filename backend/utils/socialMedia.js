// utils/prompts/socialMedia.js

const socialMediaPrompts = {
    "Sosyal Medya Takvimi": `
  Verilen marka veya içerik teması için 7 günlük sosyal medya paylaşım takvimi oluştur.
  
  🧠 Gereklilikler:
  - Her gün için 1 paylaşım önerisi sunulmalı.
  - İçerik türleri çeşitlendirilmeli (eğlenceli, bilgilendirici, etkileşimli, tanıtım).
  - Her öneri kısa başlık ve açıklama içermeli.
  - Hedef kitleye uygun ton ve stil tercih edilmeli.
  `.trim(),
  
    "Tweet Önerileri": `
  Verilen temaya uygun dikkat çekici, kısa ve etkili tweet önerileri oluştur.
  
  🧠 Gereklilikler:
  - En az 5 adet tweet önerisi verilmeli.
  - Her biri maksimum 280 karakteri geçmemeli.
  - Mizahi, bilgilendirici veya ilham verici tonlardan biri tercih edilebilir.
  - Viral potansiyeli olan mesajlar yazılmalı.
  `.trim(),
  
    "Instagram Metni": `
  Instagram gönderisi ya da hikâyesi için ilgi çekici metin oluştur.
  
  🧠 Gereklilikler:
  - İlk satır dikkat çekici ve çağrı içerikli olmalı.
  - Gönderi kısa açıklamalarla duygusal, eğlenceli ya da bilgilendirici olabilir.
  - CTA içermesi teşvik edilir (örn. "Kaydet", "Arkadaşını etiketle").
  `.trim(),
  
    "TikTok & Reels": `
  Kısa video içerikleri (TikTok veya Instagram Reels) için açıklama metni üret.
  
  🧠 Gereklilikler:
  - Mizahi, trend odaklı veya viral mesaj içermeli.
  - CTA ve etiketler önerilebilir.
  - Kısa ama çarpıcı bir anlatım tercih edilmeli.
  `.trim(),
  
    "Topluluk Yorumları": `
  Topluluk gönderilerine yönelik pozitif ve etkileşimli yorum örnekleri hazırla.
  
  🧠 Gereklilikler:
  - En az 3 yorum önerisi sunulmalı.
  - Samimi, özgün ve katkı sağlayan ifadeler kullanılmalı.
  - Aşırı emoji veya spam tarzı yapılardan kaçınılmalı.
  `.trim()
  };
  
  module.exports = socialMediaPrompts;
  