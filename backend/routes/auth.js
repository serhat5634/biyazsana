const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// 🔐 E-posta & Şifre ile Giriş (POST /api/auth/login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: '❗ E-posta ve şifre gereklidir.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: '❌ Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: '❌ Hatalı şifre.' });

    const payload = { user: { id: user.id } };
    const secret = process.env.JWT_SECRET || 'gizliAnahtar';

    jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
      if (err) {
        console.error('❌ Token oluşturulamadı:', err);
        return res.status(500).json({ msg: 'Sunucu hatası: token üretilemedi.' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('❌ Sunucu hatası:', err.message);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// 🔁 Google ile Giriş Başlat (GET /api/auth/google)
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// ✅ Google Callback (GET /api/auth/google/callback)
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://biyazsana.com/login',
    session: true, // Gerekirse false yapılabilir
  }),
  (req, res) => {
    res.redirect('https://biyazsana.com/yazi');
  }
);

module.exports = router;
