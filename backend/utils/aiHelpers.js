const aiHelpersPrompts = {
  "Kişisel Antrenör Metni": `
Kullanıcının spor hedeflerine göre kişiselleştirilmiş bir antrenman metni oluştur.

🧠 Gereklilikler:
- Hedef: Kilo verme, kas geliştirme, esneklik, kondisyon vb.
- Haftalık öneriler içeren kısa bir plan sun.
- Motivasyon artırıcı ve destekleyici bir dil kullan.
- Samimi, sade ve yapay zekâ dostu bir üslup tercih et.
`.trim(),

  "Akıllı Diyet Planı": `
Kullanıcının sağlık durumu, hedefi ve ihtiyaçlarına göre özel bir diyet programı hazırla.

🧠 Gereklilikler:
- Diyet türü belirtilmeli: Ketojenik, düşük karbonhidrat, vejetaryen, sporcu diyeti vb.
- Günlük menü önerileri sade ve uygulanabilir olmalı.
- Bilinçlendirici, moral verici ve kolay anlaşılır bir dil kullanılmalı.
`.trim(),

  "Günlük Moral Mesajı": `
Kullanıcının motivasyonunu artıracak günlük kısa ve pozitif mesaj oluştur.

🧠 Gereklilikler:
- 2-3 cümleyi geçmeyen içten bir mesaj hazırla.
- İlham verici, enerjik ve sade olmalı.
- Günü güzel başlatacak etki yaratmalı.
`.trim(),

  "Günlük İlham Önerisi": `
Kullanıcının ilgisine yönelik yaratıcı ve ilham verici günlük fikir önerileri oluştur.

🧠 Gereklilikler:
- En az 3 fikir ver: fotoğraf teması, yaratıcı yazı başlığı, minik proje vb.
- Öneriler sade, uygulanabilir ve kişisel gelişimi destekleyici olmalı.
- Farklı alanlardan ilham verici ve merak uyandıran öneriler sun.
`.trim()
};

module.exports = aiHelpersPrompts;
