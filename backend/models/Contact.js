const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // 👈 Kullanıcının e-posta adresi (isteğe bağlı zorunlu değil)
  message: { type: String, required: true },
  reply: { type: String }, // 👈 Admin'in yazacağı yanıt
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
