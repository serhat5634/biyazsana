const mongoose = require('mongoose');

const reklamSchema = new mongoose.Schema(
  {
    reklamTuru: {
      type: String,
      required: [true, 'Reklam türü zorunludur'],
      enum: ['product', 'social'], // ✅ Geçerli reklam türleri
    },
    reklamBasligi: {
      type: String,
      required: [true, 'Reklam başlığı zorunludur'],
      maxlength: [50, 'Reklam başlığı en fazla 50 karakter olabilir'],
    },
    aciklama: {
      type: String,
      default: '',
      maxlength: [250, 'Açıklama en fazla 250 karakter olabilir'],
    },
    link: {
      type: String,
      default: '',
      match: [/^(https?:\/\/)?([\w.-]+)+[\w-]+(\.[\w-]+)+(\/[\w- ./?%&=]*)?$/, 'Geçersiz URL formatı'],
    },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: {
      type: String,
      default: '',
      match: [/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/, 'Geçersiz YouTube linki'],
    },
    tiktok: { type: String, default: '' },
    linkedin: {
      type: String,
      default: '',
      match: [/^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/, 'Geçersiz LinkedIn linki'],
    },
    facebook: {
      type: String,
      default: '',
      match: [/^(https?:\/\/)?(www\.)?facebook\.com\/.+$/, 'Geçersiz Facebook linki'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ad', reklamSchema); // ✅ DÜZELTİLMİŞ VE NET
