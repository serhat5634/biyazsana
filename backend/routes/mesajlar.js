// backend/routes/mesajlar.js
const express = require('express');
const router = express.Router();
const Mesaj = require('../models/Mesaj');

// GET /api/mesajlar – tüm mesajları getir
router.get('/', async (req, res) => {
  try {
    const mesajlar = await Mesaj.find().sort({ createdAt: -1 });
    res.json(mesajlar);
  } catch (err) {
    res.status(500).json({ message: 'Mesajlar alınamadı.' });
  }
});

module.exports = router;
