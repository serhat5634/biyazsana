const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

// 📌 Giriş kontrolü ve JWT üretimi
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: '❌ Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: '❌ Hatalı şifre.' });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET || 'gizliAnahtar', { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Google OAuth rotaları
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://biyazsana.com/login',
  }),
  (req, res) => {
    res.redirect('https://biyazsana.com/yazi');
  }
);

module.exports = router;
