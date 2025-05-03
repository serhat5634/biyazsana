const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

const {
  PAYTR_MERCHANT_ID,
  PAYTR_MERCHANT_KEY,
  PAYTR_MERCHANT_SALT,
  PAYTR_DEBUG
} = process.env;

router.post('/create-token', async (req, res) => {
  const { email, amount, userId, jetonAdet } = req.body;

  try {
    const merchant_id = PAYTR_MERCHANT_ID;
    const merchant_key = PAYTR_MERCHANT_KEY;
    const merchant_salt = PAYTR_MERCHANT_SALT;

    const merchant_oid = `ORDER_${Date.now()}_${userId}`;
    const user_ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    const payment_amount = amount * 100; // kuruş cinsinden
    const currency = 'TL';
    const test_mode = PAYTR_DEBUG === '1' ? '1' : '0';
    const timeout_limit = '30';
    const lang = 'tr';

    const basket = JSON.stringify([
      [`${jetonAdet} Jeton`, 'Adet', amount]
    ]);

    const hash_str = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${basket}${currency}${test_mode}${timeout_limit}${lang}${merchant_salt}`;
    const paytr_token = crypto.createHmac('sha256', merchant_key)
      .update(hash_str)
      .digest('base64');

    const params = {
      merchant_id,
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
      debug_on: '1',
      no_installment: '1',
      max_installment: '1',
      merchant_ok_url: 'https://biyazsana.com/jeton-basarili',
      merchant_fail_url: 'https://biyazsana.com/jeton-basarisiz'
    };

    return res.json({ tokenParams: params });
  } catch (err) {
    console.error('❌ PayTR token oluşturulamadı:', err.message);
    return res.status(500).json({ message: 'Ödeme formu oluşturulamadı.' });
  }
});

module.exports = router;
