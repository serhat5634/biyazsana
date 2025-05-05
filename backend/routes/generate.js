const express = require('express');
const router = express.Router();
const generatePrompt = require('../utils/generatePrompt');
const openai = require('../openai');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ node-fetch çözümü (OpenAI istemcisi için gerekli)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
globalThis.fetch = fetch;

// 💸 Jeton bedeli tablosu (geliştirilebilir, veritabanına taşınabilir)
const jetonBedelleri = {
  'CV Yazımı': 5,
  'Marka Tanıtım Sunumu': 3,
  'Blog Yazısı': 2,
  'Sosyal Medya Postu': 1,
  'Akademik Metin': 4,
  'Reklam': 5
};

// ✨ İçerik oluşturma endpointi (POST /api/generate)
router.post('/', async (req, res) => {
  const {
    name, job, skills, education, experience,
    target, location, category, subCategory, additionalInfo,
    email, phone, languages, certifications, references
  } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim: Token eksik veya geçersiz.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    const jetonBedeli = jetonBedelleri[subCategory] || 1;

    if (user.tokens < jetonBedeli) {
      return res.status(403).json({
        message: `Bu içerik için ${jetonBedeli} jeton gerekiyor ancak jetonunuz yetersiz.`
      });
    }

    const userPrompt = generatePrompt({
      name, job, skills, education, experience,
      target, location, category, subCategory, additionalInfo,
      email, phone, languages, certifications, references
    });

    const systemMessage = subCategory === 'Marka Tanıtım Sunumu' ? `
      Sen BiYazsana platformunda çalışan kurumsal bir marka yazarı yapay zekâsısın.
      Her içerikte "ben" dili kullanmamalısın.
      Markayı dışarıdan anlatan, kurumsal ve prestijli bir dil kullan.
      Sade, doğal, güven veren ve profesyonel bir yazı oluştur.
      Marka adı, sektör ve ürün bilgileri doğal bir akışla yer alsın.
      Uydurma bilgi ekleme.
    `.trim() : `
      Sen BiYazsana platformunda çalışan profesyonel bir içerik yazarı yapay zekâsısın.
      Her içerikte kişi kendisi yazıyormuş gibi "ben dili" kullan.
      Dil sade, doğal ve profesyonel olsun.
      Sadece verilen verilerle özgün bir yazı oluştur.
      Uydurma bilgi ekleme.
    `.trim();

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: userPrompt }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
      temperature: 0.75,
      max_tokens: 1000
    });

    const aiContent = completion?.choices?.[0]?.message?.content;

    if (!aiContent) {
      return res.status(500).json({ message: '❌ Yapay zeka içeriği oluşturulamadı.' });
    }

    user.tokens -= jetonBedeli;
    await user.save();

    res.status(200).json({ result: aiContent });

  } catch (err) {
    console.error("🔥 AI veya JWT Hatası:", err);
    res.status(500).json({ message: "Sunucu hatası: işlem gerçekleştirilemedi." });
  }
});

module.exports = router;
