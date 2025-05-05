const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Admin doğrulama middleware
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Yetkisiz erişim' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Bu işlem için yetkiniz yok.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token geçersiz veya süresi dolmuş.' });
  }
};

// 📌 Kullanıcı kayıt (POST /api/users/register)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Tüm alanlar zorunludur.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Bu e-posta zaten kayıtlı.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      tokens: 3,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role, // default: 'user'
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('❌ Kayıt hatası:', err.message);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Oturum açan kullanıcıyı getir (GET /api/users/me)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Yetkisiz erişim' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Kullanıcı bulunamadı' });
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'Token geçersiz veya süresi dolmuş.' });
  }
});

// ✅ Jeton ekleme (Admin) → POST /api/users/add-jeton
router.post('/add-jeton', adminAuth, async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ msg: 'Kullanıcı ID ve jeton miktarı gereklidir.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });

    user.tokens += Number(amount);
    await user.save();

    res.json({ msg: `✅ ${amount} jeton eklendi.`, tokens: user.tokens });
  } catch (err) {
    console.error('❌ Jeton ekleme hatası:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

// ✅ Jeton sıfırlama (Admin) → POST /api/users/reset-jeton
router.post('/reset-jeton', adminAuth, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: 'Kullanıcı ID zorunludur.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'Kullanıcı bulunamadı.' });

    user.tokens = 0;
    await user.save();

    res.json({ msg: '🧹 Jetonlar sıfırlandı.', tokens: user.tokens });
  } catch (err) {
    console.error('❌ Jeton sıfırlama hatası:', err);
    res.status(500).json({ msg: 'Sunucu hatası' });
  }
});

module.exports = router;
