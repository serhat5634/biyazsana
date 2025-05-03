const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 Kullanıcı kayıt olma
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Bu e-posta zaten kullanılıyor.' });
    }

    user = new User({
      name,
      email,
      password // tokens: 3 default'ta zaten var
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(payload, 'gizliAnahtar', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// ✅ Giriş yapan kullanıcıyı döndür (JWT üzerinden)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Yetkisiz erişim' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'gizliAnahtar');
    const user = await User.findById(decoded.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'Token geçersiz' });
  }
});

// ✅ Jeton ekleme (admin veya ödeme sonrası)
router.post('/add-jeton', async (req, res) => {
  const { adet, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });

    user.tokens = (user.tokens || 0) + adet;
    await user.save();

    res.json({ msg: `${adet} jeton başarıyla eklendi.`, tokens: user.tokens });
  } catch (err) {
    console.error('Jeton eklenemedi:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Jeton sıfırlama (admin)
router.post('/reset-jeton', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });

    user.tokens = 0;
    await user.save();

    res.json({ msg: 'Jetonlar sıfırlandı.', tokens: user.tokens });
  } catch (err) {
    console.error('Jeton sıfırlama hatası:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

module.exports = router;
