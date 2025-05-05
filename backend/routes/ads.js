const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const REKLAM_JETON_BEDELI = 5; // Jeton bedeli tanımı

// 🔽 Reklam oluştur (POST /api/ads)
router.post('/', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim. Token bulunamadı.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    if (user.tokens < REKLAM_JETON_BEDELI) {
      return res.status(403).json({
        message: `Reklam vermek için ${REKLAM_JETON_BEDELI} jeton gereklidir. Jeton bakiyeniz yetersiz.`,
      });
    }

    const yeniReklam = new Ad(req.body);
    const kayitliReklam = await yeniReklam.save();

    user.tokens -= REKLAM_JETON_BEDELI;
    await user.save();

    res.status(201).json(kayitliReklam);
  } catch (error) {
    console.error('❌ Reklam oluşturulurken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası: reklam oluşturulamadı.' });
  }
});

// 🔼 Reklamları listele (GET /api/ads)
router.get('/', async (req, res) => {
  try {
    const reklamlar = await Ad.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(reklamlar);
  } catch (error) {
    console.error('❌ Reklamlar alınırken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası: reklamlar alınamadı.' });
  }
});

module.exports = router;
