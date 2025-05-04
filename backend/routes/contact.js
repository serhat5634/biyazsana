const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ✅ Kullanıcı mesajını gönder
router.post('/', async (req, res) => {
  const { email, message } = req.body;

  try {
    const newMessage = new Contact({ email, message });
    await newMessage.save();
    res.json({ msg: 'Mesajınız başarıyla gönderildi!' });
  } catch (err) {
    console.error('Mesaj gönderilemedi:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Tüm mesajları getir (Admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Mesajlar alınamadı:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Mesaja admin tarafından yanıt ekle
router.post('/:id/reply', async (req, res) => {
  const { reply } = req.body;

  try {
    const updatedMessage = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ msg: 'Mesaj bulunamadı.' });
    }

    res.json(updatedMessage);
  } catch (err) {
    console.error('Yanıt eklenemedi:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

module.exports = router;
