// utils/generatePrompt.js

const academic = require('./academic');
const aiHelpers = require('./aiHelpers');
const brandShowcase = require('./brandShowcase');
const career = require('./career');
const corporate = require('./corporate');
const creative = require('./creative');
const marketing = require('./marketing');
const personalBranding = require('./personalBranding');
const socialMedia = require('./socialMedia');

const promptRules = {
  ...academic,
  ...aiHelpers,
  ...brandShowcase,
  ...career,
  ...corporate,
  ...creative,
  ...marketing,
  ...personalBranding,
  ...socialMedia,
};

function generatePrompt({
  name, job, skills, education, experience,
  target, location, category, subCategory, additionalInfo,
  email, phone, languages, certifications, references
}) {
  const userInfo = `
Ad: ${name || "Belirtilmemiş"}
Meslek: ${job || "Belirtilmemiş"}
Yetenekler: ${skills || "Belirtilmemiş"}
Eğitim: ${education || "Belirtilmemiş"}
Deneyim: ${experience || "Belirtilmemiş"}
Hedef: ${target || "Belirtilmemiş"}
Lokasyon: ${location || "Belirtilmemiş"}
E-posta: ${email || "Belirtilmemiş"}
Telefon: ${phone || "Belirtilmemiş"}
Diller: ${languages || "Belirtilmemiş"}
Sertifikalar: ${certifications || "Belirtilmemiş"}
Referanslar: ${references || "Belirtilmemiş"}
Ek Bilgi: ${additionalInfo || "Belirtilmemiş"}
`.trim();

  // ✅ MARKA TANITIMI
  if (subCategory === "Marka Tanıtım Sunumu") {
    return `
📌 AMAÇ:
${category} / ${subCategory}

🧾 VERİLER:
Marka Adı: ${name}
Sektör: ${job}
Tanım: ${additionalInfo}

✍️ GÖREV:
${promptRules["Marka Tanıtımı"]}
`.trim();
  }

  // ✅ CV KONTROLÜ (adres, telefon, e-posta dahil)
  if (
    subCategory === "Profesyonel CV" ||
    subCategory === "Özgeçmiş (CV)" ||
    subCategory.toLowerCase().includes("cv")
  ) {
    return `
📌 AMAÇ:
${category} / ${subCategory}

🧾 VERİLER:
Ad: ${name || "Belirtilmemiş"}
Meslek: ${job || "Belirtilmemiş"}
Eğitim: ${education || "Belirtilmemiş"}
İş Deneyimi: ${experience || "Belirtilmemiş"}
Yetenekler: ${skills || "Belirtilmemiş"}
Adres: ${location || "Belirtilmemiş"}
Telefon: ${phone || "Belirtilmemiş"}
E-posta: ${email || "Belirtilmemiş"}
Diller: ${languages || "Belirtilmemiş"}
Sertifikalar: ${certifications || "Belirtilmemiş"}
Referanslar: ${references || "Belirtilmemiş"}
Kariyer Hedefi: ${target || "Belirtilmemiş"}

✍️ GÖREV:
Profesyonel bir özgeçmiş (CV) yaz. Bölüm başlıkları olsun. Bilgi yoksa “Bilgi verilmedi.” yaz. Sade, net, profesyonel dursun.
`.trim();
  }

  // 🟡 Diğer tüm kategoriler
  const görevMetni = promptRules[subCategory] || `
"${subCategory}" başlığı altında, verilen bilgilerle ben diliyle, özgün, sade ve profesyonel bir metin oluştur.

🧠 Gereklilikler:
- Yazı her seferinde sıfırdan başlasın.
- Önceki kullanıcıların ya da oturumların verileri dikkate alınmasın.
- Sadece bu kullanıcıdan gelen bilgilerle çalış.
- Dil: Akıcı, samimi ve sade.
- BiYazsana platformu üzerinden sunulacağı için kullanıcı deneyimi gözetilerek yazılsın.
`.trim();

  return `
📌 AMAÇ:
${category} / ${subCategory}

🧾 KULLANICI VERİLERİ:
${userInfo}

✍️ GÖREV:
${görevMetni}
`.trim();
}

module.exports = generatePrompt;
