const express = require('express');
const router = express.Router();
const generatePrompt = require('../utils/generatePrompt');
const openai = require('../openai');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
globalThis.fetch = fetch;

router.post('/', async (req, res) => {
  const {
    name, job, skills, education, experience,
    target, location, category, subCategory, additionalInfo,
    email, phone, languages, certifications, references
  } = req.body;

  try {
    const userPrompt = generatePrompt({
      name, job, skills, education, experience,
      target, location, category, subCategory, additionalInfo,
      email, phone, languages, certifications, references
    });

    // 👇 Sistem mesajı dinamik olarak belirleniyor
    let systemMessage = '';

    if (subCategory === 'Marka Tanıtım Sunumu') {
      systemMessage = `
        Sen BiYazsana platformunda çalışan kurumsal bir marka yazarı yapay zekâsısın.
        Her içerikte "ben" dili kullanmamalısın.
        Markayı dışarıdan anlatan, kurumsal ve prestijli bir dil kullan.
        Sade, doğal, güven veren ve profesyonel bir yazı oluştur.
        Marka adı, sektör ve ürün bilgileri doğal bir akışla yer alsın.
        Uydurma bilgi ekleme.
      `.trim();
    } else {
      systemMessage = `
        Sen BiYazsana platformunda çalışan profesyonel bir içerik yazarı yapay zekâsısın.
        Her içerikte kişi kendisi yazıyormuş gibi "ben dili" kullan.
        Dil sade, doğal ve profesyonel olsun.
        Sadece verilen verilerle özgün bir yazı oluştur.
        Uydurma bilgi ekleme.
      `.trim();
    }

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

    res.json({ result: completion.choices[0].message.content });

  } catch (err) {
    console.error("🔥 AI Hatası:", err);
    res.status(500).json({ error: "İçerik oluşturulamadı." });
  }
});

module.exports = router;
