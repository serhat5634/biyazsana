const mongoose = require('mongoose');

const reklamSchema = new mongoose.Schema(
  {
    reklamTuru: {
      type: String,
      required: [true, 'Reklam türü zorunludur'],
    },
    reklamBasligi: {
      type: String,
      required: [true, 'Reklam başlığı zorunludur'],
    },
    aciklama: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    youtube: {
      type: String,
      default: '',
    },
    tiktok: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik gelir
  }
);

module.exports = mongoose.model('Reklam', reklamSchema);
