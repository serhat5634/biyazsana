const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

// 🔐 Giriş (Login) - E-posta & Şifre ile
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: '❌ Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: '❌ Hatalı şifre.' });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'gizliAnahtar',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) return res.status(500).json({ msg: '❌ Token üretilemedi.' });
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Sunucu hatası:', err.message);
    res.status(500).json({ msg: '❌ Sunucu hatası' });
  }
});

// 🔁 Google ile Giriş - Başlat
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// ✅ Google Callback (OAuth2 redirect URL)
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://biyazsana.com/login',
  }),
  (req, res) => {
    res.redirect('https://biyazsana.com/yazi');
  }
);

module.exports = router;
