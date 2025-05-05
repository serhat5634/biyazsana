const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ✅ Kullanıcı mesajı gönderme (POST /api/contact)
router.post('/', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ msg: '❗ E-posta ve mesaj boş bırakılamaz.' });
  }

  try {
    const newMessage = new Contact({ email, message });
    await newMessage.save();
    res.status(201).json({ msg: '✅ Mesajınız başarıyla gönderildi!' });
  } catch (err) {
    console.error('❌ Mesaj gönderilemedi:', err);
    res.status(500).json({ msg: '❌ Sunucu hatası. Lütfen tekrar deneyin.' });
  }
});

// ✅ Tüm mesajları listeleme (GET /api/contact) – Admin
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Mesajlar alınamadı:', err);
    res.status(500).json({ msg: '❌ Sunucu hatası' });
  }
});

// ✅ Mesaja admin tarafından yanıt ekleme (POST /api/contact/:id/reply)
router.post('/:id/reply', async (req, res) => {
  const { reply } = req.body;

  if (!reply || reply.trim() === '') {
    return res.status(400).json({ msg: 'Yanıt boş bırakılamaz.' });
  }

  try {
    const updatedMessage = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ msg: '❌ Mesaj bulunamadı.' });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    console.error('❌ Yanıt eklenemedi:', err);
    res.status(500).json({ msg: '❌ Sunucu hatası' });
  }
});

module.exports = router;
