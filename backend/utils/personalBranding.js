// utils/prompts/personalBranding.js

const personalBrandingPrompts = {
  "Sosyal Medya Biyografisi": `
Instagram, Twitter veya TikTok gibi platformlar için kısa, dikkat çekici ve özgün bir biyografi oluştur.

🧠 Gereklilikler:
- Maksimum 160 karakter olmalı.
- Kullanıcının tarzı ve hedef kitlesi yansıtılmalı.
- Mizahi, samimi ya da profesyonel ton tercihlerine göre özgünlük korunmalı.
- Metin sade ama dikkat çekici olmalı.
`.trim(),

  "Hakkımda (Web Sitesi)": `
Kullanıcının kişisel web sitesinde yer alacak tanıtım yazısı oluştur.

🧠 Gereklilikler:
- Ben diliyle yazılmalı.
- Samimi, içten ve güven veren bir ton tercih edilmeli.
- Kısa paragraflarla net bir anlatım yapılmalı.
- Okuyucuda profesyonellik ve yakınlık duygusu oluşturmalı.
`.trim(),

  "Founder Story (Kurucu Hikâyesi)": `
Bir girişimci veya kurucu için markasının doğuş hikayesini anlatan metin oluştur.

🧠 Gereklilikler:
- Hikâyeleştirme tekniği kullanılmalı.
- Kurucunun motivasyonu, karşılaştığı zorluklar ve vizyonu vurgulanmalı.
- Samimi ama stratejik bir ton tercih edilmeli.
- İlham veren ve güven aşılayan bir yapı kurulmalı.
`.trim(),

  "Kişisel Bio": `
Kullanıcının çeşitli platformlarda (sosyal medya, blog, sunum vb.) kullanabileceği kısa biyografi metni oluştur.

🧠 Gereklilikler:
- Ben diliyle kısa ve öz yazılmalı.
- Meslek, ilgi alanı ve temel özellikler sade biçimde aktarılmalı.
- 2-3 kısa cümle yeterlidir.
- Kullanım kolaylığı ve özlü anlatım ön planda tutulmalı.
`.trim()
};

module.exports = personalBrandingPrompts;
