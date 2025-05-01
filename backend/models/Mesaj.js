// backend/models/Mesaj.js
const mongoose = require('mongoose');

const mesajSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  mesaj: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Mesaj', mesajSchema);
