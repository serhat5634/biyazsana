const express = require('express');
const router = express.Router();
const Reklam = require('../models/Ad');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔽 Yeni reklam oluşturma (POST /api/reklamlar)
router.post('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erişim. Token bulunamadı.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'gizliAnahtar');
    const user = await User.findById(decoded.user.id);

    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    // ✅ Jeton kontrolü
    const jetonBedeli = 5;
    if (user.tokens < jetonBedeli) {
      return res.status(403).json({ message: `Reklam vermek için en az ${jetonBedeli} jeton gerekir. Jetonunuz yetersiz.` });
    }

    // ✅ Reklam kaydı
    const yeniReklam = new Reklam(req.body);
    const kayitliReklam = await yeniReklam.save();

    // ✅ Jetondan 5 düş
    user.tokens -= jetonBedeli;
    await user.save();

    res.status(201).json(kayitliReklam);
  } catch (error) {
    console.error('❌ Reklam oluşturulurken hata:', error.message);
    res.status(400).json({ message: 'Reklam oluşturulamadı.' });
  }
});

// 🔼 Tüm reklamları listele (GET /api/reklamlar)
router.get('/', async (req, res) => {
  try {
    const reklamlar = await Reklam.find().sort({ createdAt: -1 }); // son eklenen en üste
    res.status(200).json(reklamlar);
  } catch (error) {
    console.error('❌ Reklamlar alınırken hata:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
