const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();
const User = require('../models/User');

const {
  PAYTR_MERCHANT_ID,
  PAYTR_MERCHANT_KEY,
  PAYTR_MERCHANT_SALT,
  PAYTR_DEBUG
} = process.env;

// 🔹 Jeton satın alma için ödeme formu token oluştur
router.post('/token', async (req, res) => {
  const { email, amount, userId, jetonAdet } = req.body;

  try {
    const merchant_oid = `ORDER_${Date.now()}_${userId}`;
    const user_ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    const payment_amount = amount * 100; // kuruş
    const currency = 'TL';
    const basket = JSON.stringify([[`${jetonAdet} Jeton`, 'Adet', amount]]);
    const test_mode = PAYTR_DEBUG === '1' ? '1' : '0';
    const timeout_limit = '30';
    const lang = 'tr';

    const hash_str =
      PAYTR_MERCHANT_ID +
      user_ip +
      merchant_oid +
      email +
      payment_amount +
      basket +
      currency +
      test_mode +
      timeout_limit +
      lang +
      PAYTR_MERCHANT_SALT;

    const paytr_token = crypto
      .createHmac('sha256', PAYTR_MERCHANT_KEY)
      .update(hash_str)
      .digest('base64');

    const postData = {
      merchant_id: PAYTR_MERCHANT_ID,
      user_ip,
      merchant_oid,
      email,
      payment_amount,
      paytr_token,
      user_name: 'BiYazsana Kullanıcısı',
      user_address: 'Online',
      user_phone: '0000000000',
      basket,
      currency,
      test_mode,
      timeout_limit,
      lang,
      no_installment: '1',
      max_installment: '1',
      merchant_ok_url: 'https://biyazsana.com/jeton-basarili',
      merchant_fail_url: 'https://biyazsana.com/jeton-basarisiz',
      debug_on: '1'
    };

    const response = await axios.post('https://www.paytr.com/odeme/api/get-token', new URLSearchParams(postData));

    if (response.data?.status === 'success') {
      return res.json({ paymentUrl: `https://www.paytr.com/odeme/guvenli/${response.data.token}` });
    } else {
      console.error('❌ PayTR Hata:', response.data.reason);
      return res.status(400).json({ message: response.data.reason });
    }
  } catch (err) {
    console.error('❌ PayTR token oluşturulamadı:', err.message);
    return res.status(500).json({ message: 'Sunucu hatası. Token alınamadı.' });
  }
});

// 🔄 PayTR ödeme bildirimi (CALLBACK)
router.post('/callback', async (req, res) => {
  const { merchant_oid, status, total_amount } = req.body;

  // İsteği doğrulamak için buraya MAC kontrolü de eklenebilir (isteğe bağlı)

  try {
    if (status === 'success') {
      const userId = merchant_oid.split('_').pop(); // ORDER_123456789_userId
      const jetonSayisi = parseInt(total_amount) / 100; // 500 = 5 jeton

      const user = await User.findById(userId);
      if (!user) return res.status(404).send('Kullanıcı bulunamadı');

      user.tokens += jetonSayisi;
      await user.save();

      return res.status(200).send('OK');
    } else {
      return res.status(400).send('Payment failed');
    }
  } catch (err) {
    console.error('❌ PayTR callback hatası:', err);
    return res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
