const express = require('express');
const router = express.Router();
const Reklam = require('../models/Ad');

// 🔽 Yeni reklam oluşturma (POST /api/reklamlar)
router.post('/', async (req, res) => {
  try {
    const yeniReklam = new Reklam(req.body);
    const kayitliReklam = await yeniReklam.save();
    res.status(201).json(kayitliReklam);
  } catch (error) {
    console.error('❌ Reklam oluşturulurken hata:', error.message);
    res.status(400).json({ message: error.message });
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
